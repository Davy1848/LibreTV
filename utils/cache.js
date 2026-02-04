// utils/cache.js - LibreTV 全局三级缓存工具（海报+视频共用）

class CacheService {
    constructor() {
        this.memoryCache = new Map();
        this.memoryCacheSize = 50;
        this.lsPrefix = 'libretv_';
    }

    // 内存缓存操作
    memory = {
        set: (key, value, ttl = null) => {
            const cacheKey = `${this.lsPrefix}${key}`;
            const item = {
                value,
                expiry: ttl ? Date.now() + ttl : null
            };
            this.memoryCache.set(cacheKey, item);
            this._manageMemoryCache();
        },

        get: (key) => {
            const cacheKey = `${this.lsPrefix}${key}`;
            const item = this.memoryCache.get(cacheKey);
            if (!item) return null;
            if (item.expiry && Date.now() > item.expiry) {
                this.memoryCache.delete(cacheKey);
                return null;
            }
            return item.value;
        },

        delete: (key) => {
            const cacheKey = `${this.lsPrefix}${key}`;
            this.memoryCache.delete(cacheKey);
        },

        clear: () => {
            this.memoryCache.clear();
        }
    };

    // LocalStorage缓存操作
    localStorage = {
        set: (key, value, ttl = null) => {
            try {
                const cacheKey = `${this.lsPrefix}${key}`;
                const item = {
                    value,
                    expiry: ttl ? Date.now() + ttl : null
                };
                localStorage.setItem(cacheKey, JSON.stringify(item));
            } catch (error) {
                console.warn('LocalStorage set failed:', error);
            }
        },

        get: (key) => {
            try {
                const cacheKey = `${this.lsPrefix}${key}`;
                const itemStr = localStorage.getItem(cacheKey);
                if (!itemStr) return null;
                const item = JSON.parse(itemStr);
                if (item.expiry && Date.now() > item.expiry) {
                    localStorage.removeItem(cacheKey);
                    return null;
                }
                return item.value;
            } catch (error) {
                console.warn('LocalStorage get failed:', error);
                return null;
            }
        },

        delete: (key) => {
            try {
                const cacheKey = `${this.lsPrefix}${key}`;
                localStorage.removeItem(cacheKey);
            } catch (error) {
                console.warn('LocalStorage delete failed:', error);
            }
        },

        clear: (prefix) => {
            try {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(`${this.lsPrefix}${prefix}`)) {
                        localStorage.removeItem(key);
                    }
                });
            } catch (error) {
                console.warn('LocalStorage clear failed:', error);
            }
        }
    };

    // Service Worker缓存操作（浏览器级缓存）
    serviceWorker = {
        async set(url, response) {
            if ('caches' in window) {
                try {
                    const cache = await caches.open('libretv-video-cache-v1');
                    await cache.put(url, response);
                } catch (error) {
                    console.warn('Service Worker set failed:', error);
                }
            }
        },

        async get(url) {
            if ('caches' in window) {
                try {
                    const cache = await caches.open('libretv-video-cache-v1');
                    const response = await cache.match(url);
                    return response;
                } catch (error) {
                    console.warn('Service Worker get failed:', error);
                    return null;
                }
            }
            return null;
        },

        async delete(url) {
            if ('caches' in window) {
                try {
                    const cache = await caches.open('libretv-video-cache-v1');
                    await cache.delete(url);
                } catch (error) {
                    console.warn('Service Worker delete failed:', error);
                }
            }
        }
    };

    // 三级缓存获取（内存 → LocalStorage → Service Worker）
    async get(key, isUrl = false) {
        // 1. 内存缓存
        let value = this.memory.get(key);
        if (value) return value;

        // 2. LocalStorage缓存
        value = this.localStorage.get(key);
        if (value) {
            // 同步到内存缓存
            this.memory.set(key, value);
            return value;
        }

        // 3. Service Worker缓存（仅适用于URL）
        if (isUrl) {
            const response = await this.serviceWorker.get(key);
            if (response) {
                return response;
            }
        }

        return null;
    }

    // 三级缓存设置
    async set(key, value, ttl = null, isUrl = false) {
        // 1. 内存缓存
        this.memory.set(key, value, ttl);

        // 2. LocalStorage缓存（非URL或小数据）
        if (!isUrl || (typeof value === 'string' && value.length < 500000)) {
            this.localStorage.set(key, value, ttl);
        }

        // 3. Service Worker缓存（仅适用于Response对象）
        if (isUrl && value instanceof Response) {
            await this.serviceWorker.set(key, value);
        }
    }

    // 删除缓存
    async delete(key, isUrl = false) {
        this.memory.delete(key);
        this.localStorage.delete(key);
        if (isUrl) {
            await this.serviceWorker.delete(key);
        }
    }

    // 管理内存缓存大小
    _manageMemoryCache() {
        if (this.memoryCache.size > this.memoryCacheSize) {
            const keys = Array.from(this.memoryCache.keys());
            const deleteCount = Math.floor(keys.length / 2);
            for (let i = 0; i < deleteCount; i++) {
                this.memoryCache.delete(keys[i]);
            }
        }
    }

    // 清理过期缓存
    cleanup() {
        // 清理内存缓存
        const keys = Array.from(this.memoryCache.keys());
        keys.forEach(key => {
            const item = this.memoryCache.get(key);
            if (item.expiry && Date.now() > item.expiry) {
                this.memoryCache.delete(key);
            }
        });

        // 清理LocalStorage缓存
        const lsKeys = Object.keys(localStorage);
        lsKeys.forEach(key => {
            if (key.startsWith(this.lsPrefix)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item.expiry && Date.now() > item.expiry) {
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    localStorage.removeItem(key);
                }
            }
        });
    }
}

// 导出单例实例
const cacheService = new CacheService();
export default cacheService;