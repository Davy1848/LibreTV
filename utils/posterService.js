// utils/posterService.js - LibreTV 海报渲染核心服务（单例，整合缓存/刮削/懒加载）

import cacheService from './cache.js';
import requestService from './request.js';

class PosterService {
    constructor() {
        this.config = window.POSTER_CONFIG || {
            apiPosterFields: ['vod_pic', 'pic', 'cover', 'poster'],
            scraperSources: [
                {
                    name: 'douban',
                    searchUrl: 'https://movie.douban.com/j/subject_suggest?q={title}',
                    posterPath: 'img',
                    timeout: 8000
                },
                {
                    name: 'wmdb',
                    searchUrl: 'https://api.wmdb.tv/movie/api?name={title}',
                    posterPath: 'poster',
                    timeout: 6000
                },
                {
                    name: 'cnScraper',
                    searchUrl: 'https://api.douban-imdb-api.rovecat.com/api/v1/movie/search?keyword={title}',
                    posterPath: 'result[0].poster',
                    timeout: 6000
                },
                {
                    name: 'mtime',
                    searchUrl: 'https://api.mtime.cn/PageSubArea/RecommendMovieList.api',
                    posterPath: 'movies[0].imgUrl',
                    timeout: 6000
                },
                {
                    name: 'tmdb',
                    searchUrl: 'https://api.tmdb.org/3/search/multi?query={title}&language=zh-CN',
                    posterPath: 'results[0].poster_path',
                    posterPrefix: 'https://image.tmdb.org/t/p/w500',
                    timeout: 6000
                },
                {
                    name: 'omdb',
                    searchUrl: 'https://www.omdbapi.com/?apikey=68355d6b&type=movie&t={title}',
                    posterPath: 'Poster',
                    timeout: 6000
                }
            ],
            cache: {
                enabled: true,
                ttl: 7 * 24 * 60 * 60 * 1000,
                storageKey: 'libretv_poster_cache'
            },
            fallback: {
                defaultPoster: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iODAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIj7lm73kuK3lm73PC90ZXh0Pjwvc3ZnPg=='
            },
            performance: {
                lazyLoad: true,
                preloadCount: 5,
                concurrentLimit: 8
            }
        };
        this.lazyLoadObserver = null;
        this.activeRequests = 0;
        this.initLazyLoad();
    }

    // 初始化懒加载
    initLazyLoad() {
        if ('IntersectionObserver' in window && this.config.performance.lazyLoad) {
            this.lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const posterUrl = img.getAttribute('data-poster');
                        if (posterUrl) {
                            img.src = posterUrl;
                            img.removeAttribute('data-poster');
                            this.lazyLoadObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });
        }
    }

    // 带超时控制的 fetch
    async fetchWithTimeout(url, options, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    // 获取海报（API海报优先，然后刮削，最后默认封面）
    async getPoster(videoInfo) {
        const { title, id, cover } = videoInfo;
        const cacheKey = `poster_${id || title}`;

        // 1. 尝试从缓存获取
        const cachedPoster = await cacheService.get(cacheKey);
        if (cachedPoster) {
            return cachedPoster;
        }

        // 2. 尝试从API字段获取
        let poster = this.extractPosterFromApi(videoInfo);
        if (poster) {
            await this.cachePoster(cacheKey, poster);
            return poster;
        }

        // 3. 使用豆瓣原始海报
        if (cover && cover.startsWith('http')) {
            await this.cachePoster(cacheKey, cover);
            return cover;
        }

        // 4. 限制并发请求
        let waitCount = 0;
        while (this.activeRequests >= this.config.performance.concurrentLimit) {
            waitCount++;
            if (waitCount > 10) {
                return this.config.fallback.defaultPoster;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this.activeRequests++;

        try {
            // 5. 尝试从刮削源获取（并行请求）
            poster = await this.scrapePoster(title);
            if (poster) {
                await this.cachePoster(cacheKey, poster);
                return poster;
            }
        } catch (error) {
            console.warn('Get poster failed:', error.message);
        } finally {
            this.activeRequests--;
        }

        // 6. 返回默认海报
        return this.config.fallback.defaultPoster;
    }

    // 从API响应中提取海报
    extractPosterFromApi(videoInfo) {
        for (const field of this.config.apiPosterFields) {
            if (videoInfo[field]) {
                return videoInfo[field];
            }
        }
        return null;
    }

    // 从刮削源获取海报（并行请求）
    async scrapePoster(title) {
        const promises = this.config.scraperSources.map(async (source) => {
            try {
                const searchUrl = source.searchUrl.replace('{title}', encodeURIComponent(title));
                // 默认不使用代理，避免本地开发环境中代理不可用导致的请求失败
                const data = await requestService.posterRequest(searchUrl, false);
                
                if (data) {
                    const posterPath = this.evaluatePath(data, source.posterPath);
                    if (posterPath) {
                        let posterUrl = posterPath;
                        if (source.posterPrefix && !posterPath.startsWith('http')) {
                            posterUrl = source.posterPrefix + posterPath;
                        }
                        // 验证海报URL
                        if (await this.validatePosterUrl(posterUrl)) {
                            return posterUrl;
                        }
                    }
                }
            } catch (error) {
                console.warn(`Scrape poster from ${source.name} failed:`, error.message);
            }
            return null;
        });

        const results = await Promise.allSettled(promises);
        
        // 返回第一个成功的结果
        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                return result.value;
            }
        }
        
        return null;
    }

    // 验证海报URL是否有效
    async validatePosterUrl(url) {
        try {
            const response = await this.fetchWithTimeout(url, {
                method: 'HEAD'
            }, 3000);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // 评估路径表达式（支持简单的路径访问）
    evaluatePath(data, path) {
        try {
            if (path.includes('.')) {
                return path.split('.').reduce((acc, key) => {
                    return acc && acc[key];
                }, data);
            } else if (path.includes('[')) {
                // 简单的数组访问，如 results[0].poster_path
                const match = path.match(/([a-zA-Z0-9_]+)\[(\d+)\](?:\.(.+))?/);
                if (match) {
                    const [, arrayName, index, subPath] = match;
                    const array = data[arrayName];
                    if (array && array[index]) {
                        if (subPath) {
                            return subPath.split('.').reduce((acc, key) => {
                                return acc && acc[key];
                            }, array[index]);
                        }
                        return array[index];
                    }
                }
            }
            return data[path];
        } catch (error) {
            console.warn('Evaluate path failed:', error.message);
            return null;
        }
    }

    // 缓存海报
    async cachePoster(key, poster) {
        if (this.config.cache.enabled) {
            await cacheService.set(key, poster, this.config.cache.ttl);
        }
    }

    // 渲染海报到容器
    async renderPoster(container, videoInfo) {
        const { title } = videoInfo;
        
        // 清理容器
        container.innerHTML = '';
        
        try {
            const poster = await this.getPoster(videoInfo);
            
            if (poster.startsWith('data:')) {
                // 渲染默认海报
                this.renderDefaultPoster(container, title);
            } else {
                // 渲染真实海报
                this.renderImagePoster(container, poster, title);
            }
        } catch (error) {
            console.warn('Render poster failed:', error.message);
            this.renderDefaultPoster(container, title);
        }
    }

    // 渲染图片海报
    renderImagePoster(container, posterUrl, title) {
        const img = document.createElement('img');
        img.className = 'w-full h-full object-cover';
        img.alt = title;
        img.loading = 'lazy';
        
        // 使用懒加载
        if (this.lazyLoadObserver) {
            img.setAttribute('data-poster', posterUrl);
            this.lazyLoadObserver.observe(img);
        } else {
            img.src = posterUrl;
        }
        
        // 图片加载失败时显示默认海报
        img.onerror = () => {
            container.innerHTML = '';
            this.renderDefaultPoster(container, title);
        };
        
        container.appendChild(img);
    }

    // 渲染默认海报
    renderDefaultPoster(container, title) {
        const defaultCover = document.createElement('div');
        defaultCover.className = 'w-full h-full flex items-center justify-center bg-black';
        
        const titleEl = document.createElement('div');
        titleEl.className = 'text-center px-4 text-white text-sm';
        titleEl.textContent = title.length > 10 ? title.substring(0, 10) + '...' : title;
        
        defaultCover.appendChild(titleEl);
        container.appendChild(defaultCover);
    }

    // 预加载海报
    async preloadPosters(videoInfos) {
        const postersToPreload = videoInfos.slice(0, this.config.performance.preloadCount);
        
        const promises = postersToPreload.map(async (videoInfo) => {
            try {
                await this.getPoster(videoInfo);
            } catch (error) {
                console.warn('Preload poster failed:', error.message);
            }
        });
        
        await Promise.allSettled(promises);
    }

    // 批量渲染海报
    async batchRenderPosters(containers, videoInfos) {
        const promises = containers.map(async (container, index) => {
            if (videoInfos[index]) {
                await this.renderPoster(container, videoInfos[index]);
            }
        });
        
        await Promise.allSettled(promises);
    }

    // 清理缓存
    async clearCache() {
        await cacheService.localStorage.clear('poster_');
        console.log('Poster cache cleared');
    }

    // 获取缓存状态
    getCacheStatus() {
        return {
            memoryCacheSize: cacheService.memoryCache?.size || 0,
            config: this.config.cache
        };
    }

    // 更新配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.initLazyLoad();
        console.log('Poster service config updated');
    }
}

// 导出单例实例
const posterService = new PosterService();
export default posterService;

// 暴露到全局作用域
if (typeof window !== 'undefined') {
    window.posterService = posterService;
}