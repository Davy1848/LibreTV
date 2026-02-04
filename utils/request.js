// utils/request.js - LibreTV 全局网络请求工具（海报+视频共用）

class RequestService {
    constructor() {
        this.concurrentLimit = 5;
        this.activeRequests = 0;
        this.queue = [];
        this.defaultHeaders = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Connection': 'keep-alive'
        };
    }

    // 基础请求方法
    async request(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: this.defaultHeaders,
            timeout: 10000,
            retries: 3,
            retryDelay: 1000,
            ...options
        };

        return this._withTimeout(
            this._withRetry(() => this._performRequest(url, defaultOptions), defaultOptions.retries, defaultOptions.retryDelay),
            defaultOptions.timeout
        );
    }

    // 执行实际请求
    async _performRequest(url, options) {
        return new Promise((resolve, reject) => {
            if (this.activeRequests >= this.concurrentLimit) {
                // 加入队列
                this.queue.push({ url, options, resolve, reject });
                return;
            }

            this._executeRequest(url, options, resolve, reject);
        });
    }

    // 执行请求（带并发控制）
    async _executeRequest(url, options, resolve, reject) {
        this.activeRequests++;

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // 根据 Content-Type 自动解析响应
            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            this.activeRequests--;
            // 处理队列中的下一个请求
            this._processQueue();
        }
    }

    // 处理队列
    _processQueue() {
        if (this.queue.length > 0 && this.activeRequests < this.concurrentLimit) {
            const { url, options, resolve, reject } = this.queue.shift();
            this._executeRequest(url, options, resolve, reject);
        }
    }

    // 超时处理
    _withTimeout(promise, timeout) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error(`Request timeout after ${timeout}ms`));
            }, timeout);

            promise
                .then(result => {
                    clearTimeout(timeoutId);
                    resolve(result);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
        });
    }

    // 重试机制
    async _withRetry(fn, retries, delay) {
        try {
            return await fn();
        } catch (error) {
            if (retries <= 0) {
                throw error;
            }
            
            console.warn(`Request failed, retrying ${retries} more times...`, error.message);
            await this._delay(delay);
            return this._withRetry(fn, retries - 1, delay * 1.5); // 指数退避
        }
    }

    // 延迟
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // GET 请求
    get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    }

    // POST 请求
    post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.defaultHeaders,
                ...options.headers
            },
            body: JSON.stringify(data)
        });
    }

    // 批量请求（并行，带并发控制）
    async batch(requests) {
        const results = [];
        const errors = [];

        for (let i = 0; i < requests.length; i++) {
            const { url, options } = requests[i];
            try {
                const result = await this.request(url, options);
                results[i] = result;
            } catch (error) {
                console.warn(`Batch request ${i} failed:`, error.message);
                errors[i] = error;
                results[i] = null;
            }
        }

        return { results, errors };
    }

    // 海报专用请求（带代理支持）
    async posterRequest(url, useProxy = false) {
        if (useProxy && window.PROXY_URL) {
            url = window.PROXY_URL + encodeURIComponent(url);
        }
        
        return this.request(url, {
            headers: {
                'Referer': 'https://movie.douban.com/',
                ...this.defaultHeaders
            }
        });
    }

    // 视频切片请求（优化网络参数）
    async videoSegmentRequest(url) {
        return this.request(url, {
            headers: {
                'Referer': 'https://www.baidu.com/',
                'Accept': '*/*',
                'Range': 'bytes=0-',
                ...this.defaultHeaders
            },
            timeout: 15000,
            retries: 5
        });
    }

    // 获取请求状态
    getStatus() {
        return {
            activeRequests: this.activeRequests,
            queueLength: this.queue.length,
            concurrentLimit: this.concurrentLimit
        };
    }

    // 设置并发限制
    setConcurrentLimit(limit) {
        this.concurrentLimit = Math.max(1, Math.min(10, limit));
    }
}

// 导出单例实例
const requestService = new RequestService();
export default requestService;