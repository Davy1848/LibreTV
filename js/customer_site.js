const CUSTOMER_SITES = {
    // 原CUSTOMER_SITES中maotaizy的api已修复（含/at/json），保留并补充detail
    maotaizy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod/at/json',
        name: '茅台资源',
        detail: 'https://maotaizy.cc' // 补充detail
    },
    // 以下为原CUSTOMER_SITES与新api_site中键名和api均相同的条目（保留并补充detail）
    dyttzy: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod',
        name: '电影天堂资源',
        detail: 'http://caiji.dyttzyapi.com'
    },
    ruyi: {
        api: 'http://cj.rycjapi.com/api.php/provide/vod',
        name: '如意资源',
        detail: 'http://rycjapi.com' // 补充detail
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴风资源',
        detail: 'https://bfzyapi.com' // 补充detail
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod',
        name: '天涯资源',
        detail: 'https://tyyszy.com' // 补充detail
    },
    ffzy: {
        api: 'http://ffzy5.tv/api.php/provide/vod',
        name: '非凡影视',
        detail: 'http://ffzy5.tv'
    },
    zy360: {
        api: 'https://360zy.com/api.php/provide/vod',
        name: '360资源',
        detail: 'https://360zy.com' // 补充detail
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod',
        name: '卧龙资源',
        detail: 'https://wolongzyw.com' // 补充detail
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '极速资源',
        detail: 'https://jszyapi.com'
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod',
        name: '豆瓣资源',
        detail: 'https://dbzy.tv' // 补充detail
    },
    mozhua: {
        api: 'https://mozhuazy.com/api.php/provide/vod',
        name: '魔爪资源',
        detail: 'https://mozhuazy.com' // 补充detail
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod',
        name: '魔都资源',
        detail: 'https://www.mdzyapi.com' // 补充detail
    },
    zuid: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大资源',
        detail: 'https://zuidapi.com' // 补充detail
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod',
        name: '无尽资源',
        detail: 'https://wujinapi.me' // 补充detail
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod',
        name: 'iKun资源',
        detail: 'https://ikunzyapi.com' // 补充detail
    },
    lzi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod',
        name: '量子资源站',
        detail: 'https://lziapi.com' // 补充detail
    },
    xiaomaomi: {
        api: 'https://zy.xmm.hk/api.php/provide/vod',
        name: '小猫咪资源',
        detail: 'https://xmm.hk' // 补充detail
    },
    // 新增api_site中独有的条目（补充detail）
    heimuer: {
        api: 'https://json.heimuer.xyz/api.php/provide/vod',
        name: '黑木耳',
        detail: 'https://heimuer.tv'
    },
    yinghua: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod',
        name: '樱花资源',
        detail: 'https://apiyhzy.com' // 补充detail
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod',
        name: '旺旺短剧',
        detail: 'https://wwzy.tv' // 补充detail
    }
};

// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}
