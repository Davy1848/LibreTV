const SITE_CONFIG = {
  dyttzy: {
    api: 'http://caiji.dyttzyapi.com/api.php/provide/vod',
    name: '电影天堂资源',
  },
  maoyan: {
    api: 'https://api.maoyanapi.top/api.php/provide/vod',
    name: '猫眼资源',
  },
  zy360: {
    api: 'https://360zyzz.com/api.php/provide/vod',
    name: '360资源',
  },
  ffzy: {
    api: 'https://api.ffzyapi.com/api.php/provide/vod',
    name: '非凡资源',
    detail: 'http://ffzy5.tv', // 保留原有效detail
  },
  kuaiche: {
    api: 'https://caiji.kczyapi.com/api.php/provide/vod/from/kcm3u8',
    name: '快车资源',
  },
  wwzy: {
    api: 'https://wwzy.tv/api.php/provide/vod',
    name: '旺旺短剧',
  },
  wolong: {
    api: 'https://wolongzyw.com/api.php/provide/vod',
    name: '卧龙资源',
  },
  guangsu: {
    api: 'https://api.guangsuapi.com/api.php/provide/vod',
    name: '光速资源',
  },
  zuid: {
    api: 'https://api.zuidapi.com/api.php/provide/vod',
    name: '最大资源',
  },
  wwzy_api: {
    api: 'https://api.wwzy.tv/api.php/provide/vod',
    name: '旺旺资源',
  },
  iqiyi: {
    api: 'https://iqiyizyapi.com/api.php/provide/vod',
    name: 'iqiyi资源',
  },
  dbzy: {
    api: 'https://caiji.dbzy5.com/api.php/provide/vod',
    name: '豆瓣资源',
  },
  tyyszy: {
    api: 'https://tyyszy.com/api.php/provide/vod',
    name: '天涯资源',
  },
  maotai: {
    api: 'https://caiji.maotaizy.cc/api.php/provide/vod',
    name: '茅台资源',
  },
  mdzy: {
    api: 'https://www.mdzyapi.com/api.php/provide/vod',
    name: '魔都资源',
  },
  lzi: {
    api: 'https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8',
    name: '量子资源站',
  },
  kuaibo: {
    api: 'https://www.kuaibozy.com/api.php/provide/vod/from/kbm3u8/at/xml/',
    name: '快播资源',
  },
  xinlang: {
    api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod',
    name: '新浪资源',
  },
  jinying: {
    api: 'https://jinyingzy.com/api.php/provide/vod',
    name: '金鹰点播',
  },
  hongniu: {
    api: 'https://www.hongniuzy2.com/api.php/provide/vod',
    name: '红牛资源',
  },
  subo: {
    api: 'https://subocaiji.com/api.php/provide/vod',
    name: '速播资源',
  },
  jisu: {
    api: 'https://jszyapi.com/api.php/provide/vod',
    name: '极速资源',
  },
  modu_dm: {
    api: 'https://caiji.moduapi.cc/api.php/provide/vod',
    name: '魔都动漫',
  },
  piaoling: {
    api: 'https://p2100.net/api.php/provide/vod',
    name: '飘零资源',
  },
  aidan: {
    api: 'https://lovedan.net/api.php/provide/vod',
    name: '艾旦影视',
  },
  uku: {
    api: 'https://api.ukuapi88.com/api.php/provide/vod',
    name: 'U酷影视',
  },
  haohua: {
    api: 'https://hhzyapi.com/api.php/provide/vod',
    name: '豪华资源',
  },
  baidu: {
    api: 'https://api.apibdzy.com/api.php/provide/vod',
    name: '百度云资源',
  },
  bfzy: {
    api: 'https://bfzyapi.com/api.php/provide/vod',
    name: '暴风资源',
  },
  yinghua: {
    api: 'https://m3u8.apiyhzy.com/api.php/provide/vod',
    name: '樱花资源',
  },
  ruyi: {
    api: 'https://cj.rycjapi.com/api.php/provide/vod',
    name: '如意资源',
  },
  wujin: {
    api: 'https://api.wujinapi.me/api.php/provide/vod',
    name: '无尽资源',
  },
};

// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}
