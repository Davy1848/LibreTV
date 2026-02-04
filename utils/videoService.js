// utils/videoService.js - LibreTV 视频播放核心服务（单例，整合播放器/预加载/快进优化）

import cacheService from './cache.js';
import requestService from './request.js';

class VideoService {
    constructor() {
        this.config = window.VIDEO_CONFIG || {
            player: {
                hls: {
                    maxBufferLength: 20, // 减少缓冲长度，加快响应速度
                    maxBufferSize: 8 * 1024 * 1024, // 减少缓冲大小，节省内存
                    enableWorker: true,
                    preloadNextLevel: true,
                    nudgeMaxRetry: 3,
                    highBufferWatchdogPeriod: 2,
                    startLevel: -1, // 自动选择最佳码率
                    capLevelToPlayerSize: true, // 根据播放器大小选择合适的码率
                    maxMaxBufferLength: 30 // 最大缓冲长度
                },
                seekPreloadCount: 3 // 减少预加载数量，节省带宽
            },
            network: {
                timeout: 15000,
                parallel: 8,
                retry: 3,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                    'Referer': 'https://www.baidu.com/',
                    'Accept': '*/*',
                    'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
                }
            },
            cache: {
                m3u8: {
                    ttl: 2 * 60 * 1000, // 减少 M3U8 缓存时间，确保获取最新的播放列表
                    maxCount: 30,
                    storageKey: 'libretv_m3u8_cache'
                },
                segment: {
                    lsTTL: 24 * 60 * 60 * 1000,
                    lsMaxSize: 6 * 1024 * 1024, // 增加 LocalStorage 缓存大小
                    lsStorageKey: 'libretv_segment_cache',
                    swTTL: 7 * 24 * 60 * 60 * 1000,
                    swCacheName: 'libretv-video-cache-v1'
                }
            }
        };
        this.players = new Map();
        this.hlsInstances = new Map();
        this.initNetworkConfig();
    }

    // 初始化网络配置
    initNetworkConfig() {
        requestService.setConcurrentLimit(this.config.network.parallel);
    }

    // 带超时控制的 fetch
    async fetchWithTimeout(url, options, timeout = 10000) {
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

    // 带重试机制的请求
    async fetchWithRetry(url, options, retries = 3) {
        try {
            return await this.fetchWithTimeout(url, options, this.config.network.timeout);
        } catch (error) {
            if (retries > 0) {
                console.warn(`Request failed, retrying ${retries} more times...`, error.message);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.fetchWithRetry(url, options, retries - 1);
            }
            throw error;
        }
    }

    // 初始化播放器
    async initPlayer(container, videoUrl, options = {}) {
        const playerId = container.id || `player_${Date.now()}`;
        if (!container.id) {
            container.id = playerId;
        }

        // 清理现有播放器
        this.destroyPlayer(playerId);

        try {
            // 创建视频元素
            const video = document.createElement('video');
            video.className = 'w-full h-full';
            video.controls = options.controls !== false;
            video.autoplay = options.autoplay === true;
            video.muted = options.muted === true;
            video.playsInline = true;
            video.preload = 'metadata'; // 只预加载元数据，加快初始加载速度
            
            container.innerHTML = '';
            container.appendChild(video);

            // 处理 M3U8 格式
            if (videoUrl.includes('.m3u8')) {
                await this.initHLSPlayer(video, videoUrl, playerId);
            } else {
                // 处理普通视频格式
                video.src = videoUrl;
            }

            // 存储播放器实例
            this.players.set(playerId, video);

            // 添加事件监听器
            this.addPlayerEventListeners(video, playerId);

            return { playerId, video };
        } catch (error) {
            console.error('Init player failed:', error);
            throw error;
        }
    }

    // 初始化 HLS 播放器
    async initHLSPlayer(video, videoUrl, playerId) {
        if (!window.Hls) {
            throw new Error('HLS.js is not loaded');
        }

        // 尝试从缓存获取 M3U8
        const m3u8CacheKey = `m3u8_${btoa(videoUrl)}`;
        const cachedM3u8 = await cacheService.get(m3u8CacheKey);

        const hlsConfig = {
            ...this.config.player.hls,
            fetcher: {
                async get(url) {
                    // 尝试从缓存获取切片
                    const segmentCacheKey = `segment_${btoa(url)}`;
                    const cachedSegment = await cacheService.get(segmentCacheKey);
                    
                    if (cachedSegment) {
                        return {
                            data: cachedSegment,
                            url
                        };
                    }

                    // 从网络获取
                    try {
                        const response = await this.fetchWithRetry(url, {
                            headers: this.config.network.headers
                        });
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const data = await response.text();
                        
                        // 缓存切片
                        if (url.includes('.ts') || url.includes('.m4s')) {
                            // 检查 LocalStorage 容量，避免超出限制
                            try {
                                await cacheService.set(segmentCacheKey, data, this.config.cache.segment.lsTTL);
                            } catch (e) {
                                console.warn('Cache segment failed:', e.message);
                            }
                        }

                        return {
                            data,
                            url
                        };
                    } catch (error) {
                        console.error('Fetch segment failed:', error.message);
                        throw error;
                    }
                }.bind(this)
            }
        };

        const hls = new Hls(hlsConfig);
        this.hlsInstances.set(playerId, hls);

        // 加载视频
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        // 监听 HLS 事件
        this.addHLSEventListeners(hls, playerId);

        return hls;
    }

    // 添加播放器事件监听器
    addPlayerEventListeners(video, playerId) {
        video.addEventListener('play', () => {
            // 移除调试日志，保留必要的事件处理
        });

        video.addEventListener('pause', () => {
            // 移除调试日志，保留必要的事件处理
        });

        video.addEventListener('ended', () => {
            // 移除调试日志，保留必要的事件处理
        });

        video.addEventListener('error', (error) => {
            console.error(`Player ${playerId} error:`, error);
        });

        video.addEventListener('timeupdate', () => {
            this.handleTimeUpdate(video, playerId);
        });

        video.addEventListener('seeking', () => {
            // 移除调试日志，保留必要的事件处理
        });

        video.addEventListener('seeked', () => {
            // 移除调试日志，保留必要的事件处理
            
            // 预加载后续切片
            const hls = this.hlsInstances.get(playerId);
            if (hls) {
                this.preloadSegments(hls, video.currentTime).catch(console.warn);
            }
        });
    }

    // 添加 HLS 事件监听器
    addHLSEventListeners(hls, playerId) {
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            // 移除调试日志，保留必要的事件处理
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            // 移除调试日志，保留必要的事件处理
        });

        hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
            // 移除调试日志，保留必要的事件处理
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
            console.error(`Player ${playerId} HLS error:`, data);
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.error('Network error, trying to recover...');
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.error('Media error, trying to recover...');
                        hls.recoverMediaError();
                        break;
                    default:
                        console.error('Fatal error, cannot recover');
                        this.destroyPlayer(playerId);
                        break;
                }
            }
        });
    }

    // 处理时间更新
    handleTimeUpdate(video, playerId) {
        // 可以在这里添加播放进度记录等逻辑
    }

    // 预加载切片（优化版）
    async preloadSegments(hls, currentTime) {
        const level = hls.currentLevel;
        const levels = hls.levels;
        
        if (level === -1 || !levels[level]) {
            return;
        }

        const levelDetails = hls.levelDetails;
        if (!levelDetails) {
            return;
        }

        const frag = levelDetails.getFragForTime(currentTime);
        if (!frag) {
            return;
        }

        const fragIndex = levelDetails.fragments.indexOf(frag);
        const preloadCount = this.config.player.seekPreloadCount;
        
        // 预加载后续几个切片
        for (let i = 1; i <= preloadCount; i++) {
            const nextFrag = levelDetails.fragments[fragIndex + i];
            if (nextFrag) {
                try {
                    const segmentCacheKey = `segment_${btoa(nextFrag.url)}`;
                    const cachedSegment = await cacheService.get(segmentCacheKey);
                    
                    if (!cachedSegment) {
                        // 异步预加载，不阻塞主线程
                        (async () => {
                            try {
                                const response = await this.fetchWithRetry(nextFrag.url, {
                                    headers: this.config.network.headers
                                });
                                
                                if (response.ok) {
                                    const data = await response.text();
                                    // 检查 LocalStorage 容量，避免超出限制
                                    try {
                                        await cacheService.set(segmentCacheKey, data, this.config.cache.segment.lsTTL);
                                    } catch (e) {
                                        console.warn('Cache segment failed:', e.message);
                                    }
                                }
                            } catch (error) {
                                console.warn('Preload segment failed:', error.message);
                            }
                        })();
                    }
                } catch (error) {
                    console.warn('Preload segment error:', error.message);
                }
            }
        }
    }

    // 播放控制
    play(playerId) {
        const video = this.players.get(playerId);
        if (video) {
            video.play().catch(error => {
                console.error('Play failed:', error);
            });
        }
    }

    // 暂停控制
    pause(playerId) {
        const video = this.players.get(playerId);
        if (video) {
            video.pause();
        }
    }

    // 快进控制
    seek(playerId, time) {
        const video = this.players.get(playerId);
        if (video) {
            video.currentTime = time;
        }
    }

    // 设置音量
    setVolume(playerId, volume) {
        const video = this.players.get(playerId);
        if (video) {
            video.volume = Math.max(0, Math.min(1, volume));
        }
    }

    // 获取播放器状态
    getPlayerStatus(playerId) {
        const video = this.players.get(playerId);
        if (!video) {
            return null;
        }

        return {
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused,
            volume: video.volume,
            buffered: video.buffered.length > 0 ? {
                start: video.buffered.start(0),
                end: video.buffered.end(video.buffered.length - 1)
            } : null
        };
    }

    // 销毁播放器
    destroyPlayer(playerId) {
        const video = this.players.get(playerId);
        const hls = this.hlsInstances.get(playerId);

        if (hls) {
            try {
                hls.destroy();
            } catch (error) {
                console.warn('Destroy HLS instance failed:', error.message);
            }
            this.hlsInstances.delete(playerId);
        }

        if (video) {
            try {
                video.pause();
                video.src = '';
                video.load();
            } catch (error) {
                console.warn('Cleanup video element failed:', error.message);
            }
            this.players.delete(playerId);
        }
    }

    // 清理所有播放器
    destroyAllPlayers() {
        for (const playerId of this.players.keys()) {
            this.destroyPlayer(playerId);
        }
    }

    // 清理缓存
    async clearCache() {
        try {
            // 清理 M3U8 缓存
            await cacheService.localStorage.clear('m3u8_');
            
            // 清理切片缓存
            await cacheService.localStorage.clear('segment_');
            
            // 清理 Service Worker 缓存
            if ('caches' in window) {
                try {
                    const cache = await caches.open(this.config.cache.segment.swCacheName);
                    await cache.clear();
                } catch (error) {
                    console.warn('Clear Service Worker cache failed:', error);
                }
            }

            console.log('Video cache cleared');
        } catch (error) {
            console.error('Clear cache failed:', error);
        }
    }

    // 获取缓存状态
    getCacheStatus() {
        return {
            config: this.config.cache
        };
    }

    // 更新配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.initNetworkConfig();
        console.log('Video service config updated');
    }
}

// 导出单例实例
const videoService = new VideoService();
export default videoService;