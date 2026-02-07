// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
// 注意：PASSWORD 环境变量是必需的，所有部署都必须设置密码以确保安全
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 存储验证状态的键名
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 验证有效期（90天，约3个月）
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API站点配置
const API_SITES = {
    "api_site": {
        "电影天堂_3": {
            "name": "电影天堂",
            "api": "http://caiji.dyttzyapi.com/api.php/provide/vod?ac=list",
            "weight": 7,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "猫眼资源_4": {
            "name": "猫眼资源",
            "api": "https://api.maoyanapi.top/api.php/provide/vod?ac=list",
            "weight": 6,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "360资源_5": {
            "name": "360 资源",
            "api": "https://360zyzz.com/api.php/provide/vod?ac=list",
            "weight": 5,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "最大资源_6": {
            "name": "最大资源",
            "api": "https://api.zuidapi.com/api.php/provide/vod?ac=list",
            "weight": 4,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "香蕉资源_7": {
            "name": "香蕉资源",
            "api": "https://www.xiangjiaozyw.com/api.php/provide/vod?ac=list",
            "weight": 3,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "非凡资源_8": {
            "name": "非凡资源",
            "api": "https://api.ffzyapi.com/api.php/provide/vod?ac=list",
            "weight": 2,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "155资源_10": {
            "name": "155资源",
            "api": "https://155api.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "樱花资源_12": {
            "name": "樱花资源",
            "api": "https://m3u8.apiyhzy.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "AIvin_13": {
            "name": "AIvin",
            "api": "http://lbapiby.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "森林资源_14": {
            "name": "森林资源",
            "api": "https://beiyong.slapibf.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "细胞资源_15": {
            "name": "细胞资源",
            "api": "https://www.xxibaozyw.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "乐播资源_16": {
            "name": "乐播资源",
            "api": "https://lbapi9.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "天涯资源_17": {
            "name": "天涯资源",
            "api": "https://tyyszy.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "极速资源_18": {
            "name": "极速资源",
            "api": "https://jszyapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "大地资源_19": {
            "name": "大地资源",
            "api": "https://dadiapi.com/feifei?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "U酷影视_20": {
            "name": "U酷影视",
            "api": "https://api.ukuapi88.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "无尽资源_21": {
            "name": "无尽资源",
            "api": "https://api.wujinapi.me/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "卧龙资源_23": {
            "name": "卧龙资源",
            "api": "https://wolongzyw.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "光速资源_24": {
            "name": "光速资源",
            "api": "https://api.guangsuapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "百度云zy_25": {
            "name": "百度云zy",
            "api": "https://pz.168188.dpdns.org/?url=https://api.apibdzy.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "豆豆资源_27": {
            "name": "豆豆资源",
            "api": "https://api.douapi.cc/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "新浪资源_28": {
            "name": "新浪资源",
            "api": "https://api.xinlangapi.com/xinlangapi.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "爱奇艺_29": {
            "name": "爱奇艺",
            "api": "https://iqiyizyapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "滴滴资源_31": {
            "name": "滴滴资源",
            "api": "https://api.ddapi.cc/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "豪华资源_33": {
            "name": "豪华资源",
            "api": "https://pz.168188.dpdns.org/?url=https://hhzyapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "暴风资源_35": {
            "name": "暴风资源",
            "api": "https://bfzyapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "旺旺资源_36": {
            "name": "旺旺资源",
            "api": "https://api.wwzy.tv/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "速播资源_37": {
            "name": "速播资源",
            "api": "https://subocaiji.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "辣椒资源_38": {
            "name": "辣椒资源",
            "api": "https://pz.168188.dpdns.org/?url=https://apilj.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "优优资源_40": {
            "name": "优优资源",
            "api": "https://www.yyzywcj.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "茅台资源_41": {
            "name": "茅台资源",
            "api": "https://caiji.maotaizy.cc/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "魔都动漫_42": {
            "name": "魔都动漫",
            "api": "https://caiji.moduapi.cc/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "豆瓣资源_43": {
            "name": "豆瓣资源",
            "api": "https://caiji.dbzy5.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "艾旦影视_44": {
            "name": "艾旦影视",
            "api": "https://pz.168188.dpdns.org/?url=https://lovedan.net/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "量子影视_45": {
            "name": "量子影视",
            "api": "https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "金鹰点播_46": {
            "name": "金鹰点播",
            "api": "https://jinyingzy.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "魔都资源_47": {
            "name": "魔都资源",
            "api": "https://www.mdzyapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "旺旺短剧_48": {
            "name": "旺旺短剧",
            "api": "https://wwzy.tv/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        },
        "如意资源_49": {
            "name": "如意资源",
            "api": "https://pz.168188.dpdns.org/?url=https://cj.rycjapi.com/api.php/provide/vod?ac=list",
            "weight": 1,
            "enable": true,
            "has_poster": false,
            "poster_fields": []
        }
};

// 定义合并方法
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;


// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 只拼接参数部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大获取页数
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接参数部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    // allowedApiDomains 不再需要，因为所有请求都通过内部代理
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult' // 用于标记成人内容的属性名
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = false;

// ===================== 模块1：海报渲染核心配置（可配置化，无需改代码）=====================
const POSTER_CONFIG = {
  apiPosterFields: ['vod_pic', 'pic', 'cover', 'poster'], // API海报字段优先级
  scraperSources: [ // 刮削源优先级：豆瓣→TMDB，自动降级
    { name: 'douban', searchUrl: 'https://movie.douban.com/j/subject_suggest?q={title}', posterPath: 'img', timeout: 8000 },
    { name: 'tmdb', searchUrl: 'https://api.tmdb.org/3/search/multi?query={title}&language=zh-CN', posterPath: 'results[0].poster_path', posterPrefix: 'https://image.tmdb.org/t/p/w500', timeout: 6000 }
  ],
  cache: { enabled: true, ttl: 7 * 24 * 60 * 60 * 1000, storageKey: 'libretv_poster_cache' }, // 7天缓存
  fallback: { defaultPoster: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iODAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIj7lm73kuK3lm73PC90ZXh0Pjwvc3ZnPg==' },
  performance: { lazyLoad: true, preloadCount: 3 } // 懒加载+预加载3张
};

// ===================== 模块2：视频播放核心配置（可配置化，无需改代码）=====================
const VIDEO_CONFIG = {
  // 播放器内核配置（hls.js核心参数，针对M3U8优化）
  player: {
    hls: {
      maxBufferLength: 30, // 最大缓冲30秒（快进减少冗余）
      maxBufferSize: 10 * 1024 * 1024, // 最大缓冲10MB，避免内存溢出
      enableWorker: true, // WebWorker解析M3U8，不阻塞主线程
      preloadNextLevel: true, // 预加载下一个码率切片
      nudgeMaxRetry: 3, // 切片请求失败重试3次
      highBufferWatchdogPeriod: 2 // 2秒检测一次缓冲，快速补片
    },
    seekPreloadCount: 5 // 快进后预加载后续5个切片
  },
  // 视频网络请求配置（切片/M3U8请求优化）
  network: {
    timeout: 10000, // 切片请求超时10秒
    parallel: 5, // 最大并发5个（浏览器默认6，留1个给其他请求）
    retry: 3, // 失败重试3次
    headers: { // 模拟浏览器头，避免源站拦截
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Referer': 'https://www.baidu.com/',
      'Accept': '*/*',
      'Connection': 'keep-alive' // 长连接，减少TCP握手
    }
  },
  // 视频三级缓存配置（M3U8+切片）
  cache: {
    m3u8: { ttl: 5 * 60 * 1000, maxCount: 50, storageKey: 'libretv_m3u8_cache' }, // M3U8内存缓存5分钟
    segment: {
      lsTTL: 24 * 60 * 60 * 1000, lsMaxSize: 4 * 1024 * 1024, lsStorageKey: 'libretv_segment_cache', // LocalStorage缓存4MB
      swTTL: 7 * 24 * 60 * 60 * 1000, swCacheName: 'libretv-video-cache-v1' // Service Worker缓存7天
    }
  }
};

// 暴露所有配置到全局
window.PROXY_URL = PROXY_URL;
window.POSTER_CONFIG = POSTER_CONFIG;
window.VIDEO_CONFIG = VIDEO_CONFIG;
