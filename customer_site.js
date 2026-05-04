const CUSTOMER_SITES = {
    iqiyizy: {
        api: 'https://iqiyizyapi.com/api.php/provide/vod',
        name: '爱奇艺资源',
        detail: 'https://iqiyizyapi.com'
    },
    dbzy: {
        api: 'https://caiji.dbzy5.com/api.php/provide/vod',
        name: '豆瓣资源',
        detail: 'https://dbzy.tv'
    },
    dytt: {
        api: 'https://caiji.dyttzyapi.com/api.php/provide/vod',
        name: '电影天堂',
        detail: 'https://dyttzyapi.com'
    },
    liangzi: {
        api: 'https://cj.lzcaiji.com/api.php/provide/vod',
        name: '量子资源',
        detail: 'https://cj.lzcaiji.com'
    },
    feifan: {
        api: 'https://api.ffzyapi.com/api.php/provide/vod',
        name: '非凡资源',
        detail: 'https://cj.ffzyapi.com'
    },
    baofeng: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴风资源',
        detail: 'https://bfzy.tv'
    },
    zuida: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大资源',
        detail: 'https://zuida.xyz'
    },
    jisuzu: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '极速资源',
        detail: 'https://jszyapi.com'
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod',
        name: '无尽资源',
        detail: 'https://wujinzy.me'
    },
    sanliuling: {
        api: 'https://360zyzz.com/api.php/provide/vod',
        name: '360资源',
        detail: 'https://360zy.com'
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod',
        name: '卧龙资源',
        detail: 'https://wolongzyw.com'
    },
    ikunzy: {
        api: 'https://ikunzyapi.com/api.php/provide/vod',
        name: 'iKun资源',
        detail: 'https://ikunzy.com'
    },
    maoyan: {
        api: 'https://api.maoyanapi.top/api.php/provide/vod',
        name: '猫眼资源',
        detail: 'https://www.maoyanzy.com'
    },
    mtzy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod',
        name: '茅台资源',
        detail: 'https://mtzy.me'
    },
    modu: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod',
        name: '魔都资源',
        detail: 'https://www.moduzy.net'
    },
    wangwang: {
        api: 'https://api.wwzy.tv/api.php/provide/vod',
        name: '旺旺资源',
        detail: 'https://api.wwzy.tv'
    },
    subo: {
        api: 'https://subocaiji.com/api.php/provide/vod',
        name: '速播资源',
        detail: 'https://www.subozy.com'
    },
    xinlang: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod',
        name: '新浪资源',
        detail: 'https://xinlangapi.com'
    },
    hongniu: {
        api: 'https://www.hongniuzy2.com/api.php/provide/vod',
        name: '红牛资源',
        detail: 'https://www.hongniuzy.com'
    },
    jinying: {
        api: 'https://jinyingzy.com/api.php/provide/vod',
        name: '金鹰点播',
        detail: 'https://jinyingzy.com'
    },
    uku: {
        api: 'https://api.ukuapi88.com/api.php/provide/vod',
        name: 'U酷影视',
        detail: 'https://www.ukuzy.com'
    },
    guangsu: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod',
        name: '光速资源',
        detail: 'https://api.guangsuapi.com'
    },
    haohua: {
        api: 'https://hhzyapi.com/api.php/provide/vod',
        name: '豪华资源',
        detail: 'https://www.haohuazy.com'
    },
    piaoling: {
        api: 'https://p2100.net/api.php/provide/vod',
        name: '飘零资源',
        detail: 'https://p2100.net'
    },
    modudm: {
        api: 'https://caiji.moduapi.cc/api.php/provide/vod',
        name: '魔都动漫',
        detail: 'https://caiji.moduapi.cc'
    },
    ruyi: {
        api: 'https://cj.rycjapi.com/api.php/provide/vod',
        name: '如意资源',
        detail: 'https://www.ryzyw.com'
    },
    baiduyun: {
        api: 'https://api.apibdzy.com/api.php/provide/vod',
        name: '百度云资源',
        detail: 'https://bdzy1.com'
    },
    aidan: {
        api: 'https://lovedan.net/api.php/provide/vod',
        name: '艾旦影视',
        detail: 'https://lovedan.net'
    },
    youzzy: {
        api: 'https://api.yzzy-api.com/inc/apijson.php',
        name: '优质资源',
        detail: 'https://1080zyk4.com'
    },
    huya: {
        api: 'https://www.huyaapi.com/api.php/provide/vod',
        name: '虎牙资源',
        detail: 'https://www.huyaapi.com'
    },
    yaya: {
        api: 'https://cj.yayazy.net/api.php/provide/vod',
        name: '鸭鸭资源',
        detail: 'https://yayazy3.com'
    },
    sony: {
        api: 'https://suoniapi.com/api.php/provide/vod',
        name: '索尼资源',
        detail: 'https://suonizy.net'
    },
    kuaiche: {
        api: 'https://caiji.kuaichezy.org/api.php/provide/vod',
        name: '快车资源',
        detail: 'https://kuaichezy.com'
    },
    shandian: {
        api: 'https://xsd.sdzyapi.com/api.php/provide/vod',
        name: '闪电资源',
        detail: 'https://shandianzy.com'
    },
    lzizy: {
        api: 'https://cj.lziapi.com/api.php/provide/vod',
        name: '量子影视',
        detail: 'https://lzizy.net'
    },
    zuidabf: {
        api: 'https://zuidazy.me/api.php/provide/vod',
        name: '最大点播',
        detail: 'https://zuidazy.co'
    },
    wujinys: {
        api: 'https://api.wujinapi.com/api.php/provide/vod',
        name: '无尽影视',
        detail: 'https://wujinzy.com'
    },
    wangwangdj: {
        api: 'https://wwzy.tv/api.php/provide/vod',
        name: '旺旺短剧',
        detail: 'https://wwzy.tv'
    }
};

// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}
