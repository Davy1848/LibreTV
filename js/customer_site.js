const CUSTOMER_SITES = {
    zuid: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大资源',
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod',
        name: '无尽资源',
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴风资源'
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod',
        name: '天涯资源'
    },
    zy360: {
        api: 'https://360zy.com/api.php/provide/vod',
        name: '360资源'
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '极速资源'
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod',
        name: '豆瓣资源'
    },
    mozhua: {
        api: 'https://mozhuazy.com/api.php/provide/vod',
        name: '魔爪资源'
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod',
        name: '魔都资源'
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod',
        name: 'iKun资源'
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod',
        name: '旺旺短剧'
    },
    maotaizy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod/at/json',
        name: '茅台资源',
    },
    wolong: {
        api: 'https://collect.wolongzyw.com/api.php/provide/vod',
        name: '卧龙资源',
    },
    lzi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8',
        name: '量子资源',
    },
    xiaomaomi: {
        api: 'https://zy.xmm.hk/api.php/provide/vod',
        name: '小猫咪资源',
    },
    heimuer: {
        api: 'https://json.heimuer.xyz/api.php/provide/vod',
        name: '黑木耳',
    },
    yinghua: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod',
        name: '樱花资源',
    },
    youzhi: {
        api: 'https://api.1080zyku.com/inc/api.php/provide/vod',
        name: '优质资源库',
    },
    kudian: {
        api: 'https://api.kuapi.cc/api.php/provide/vod',
        name: '酷点资源',
    },
    yingku: {
        api: 'https://api.ykapi.net/api.php/provide/vod',
        name: '影库资源网',
    },
    kuaiche: {
        api: 'https://caiji.kczyapi.com/api.php/provide/vod/from/kcm3u8',
        name: '快车资源',
    },
    guangsu: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8',
        name: '光速资源',
    },
    laoya: {
        api: 'https://api.apilyzy.com/api.php/provide/vod',
        name: '老鸭资源采集',
    },
    beidou: {
        api: 'https://m3u8.bdxzyapi.com/api.php/provide/vod',
        name: '北斗星资源',
    },
    tiankong: {
        api: 'https://m3u8.tiankongapi.com/api.php/provide/vod/from/tkm3u8',
        name: '天空资源',
    },
    okzy: {
        api: 'https://cj.okzy.tv/inc/api.php',
        name: 'OK资源站',
    },
    okzy_kuyun: {
        api: 'https://cj.okzy.tv/inc/apikuyuns.php',
        name: 'OK资源站(kuyun)',
    },
    okzy_ckm3u8: {
        api: 'https://cj.okzy.tv/inc/apickm3u8s.php',
        name: 'OK资源站(ckm3u8)',
    },
    hongniu: {
        api: 'https://hongniuzy2.com/api.php/provide/vod/from/hnm3u8',
        name: '红牛资源'
    },
    lehuo: {
        api: 'https://lehootv.com/api.php/provide/vod',
        name: '乐活影视'
    },
    tangrenjie: {
        api: 'https://tangrenjie.tv/api.php/provide/vod',
        name: '唐人街'
    },
    tantan: {
        api: 'https://apittzy.com/api.php/provide/vod',
        name: '探探资源'
    },
    haiwaikan: {
        api: 'https://haiwaikan.com/api.php/provide/vod',
        name: '海外看资源'
    },
    baiduyun: {
        api: 'https://api.apibdzy.com/api.php/provide/vod/?ac=list',
        name: '百度云资源',
    },
    uku: {
        api: 'https://api.ukuapi.com/api.php/provide/vod/at/xml/',
        name: 'U酷资源',
    },
    fanqie: {
        api: 'https://api.fqzy.cc/api.php/provide/vod/?ac=list',
        name: '番茄资源',
    },
    "8090zy": {
        api: 'https://zy.yilans.net:8090/api.php/provide/vod/?ac=list',
        name: '8090资源',
    },
    qilin: {
        api: 'https://www.qilinzyz.com/api.php/provide/vod/?ac=list',
        name: '麒麟资源'
    },
    kuaibo: {
        api: 'https://www.kuaibozy.com/api.php/provide/vod/from/kbm3u8/at/xml/',
        name: '快播资源'
    }
};
// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}
