module.exports = {
  type: 'blog',
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类' // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: '标签' // 默认 “标签”
    }
  },
  logo: '/logo.png',
  valineConfig: {
    appId: '8hExoorhEvt9VqqjNj5shtPk-gzGzoHsz',// your appId
    appKey: 'AV9607UdRsmNSCmccKdddGQ2', // your appKey
  },
  // huawei: true,
  // vssueConfig: {
  //   platform: 'github',
  //   owner: 'sherlonWang',
  //   repo: 'https://github.com/sherlonWang/logodiy',
  //   clientId: 'eb81a86e9a7455815f74',
  //   clientSecret: 'f7ff9fe17edb3236e928d70935d5c4aebb7ae664',
  // },
  // 最后更新时间
  lastUpdated: 'Last Updated', // string | boolean
  // 作者
  author: 'IT三脚猫',
  authorAvatar: '/avatar.png',
  friendLink: [
    {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      link: 'https://vuepress-theme-reco.recoluan.com'
    },
    {
      title: '午后南杂',
      desc: 'Enjoy when you can, and endure when you must.',
      email: 'recoluan@qq.com',
      link: 'https://www.recoluan.com'
    },
    {
      title: '廖雪峰的官方网站',
      desc: '研究互联网产品和技术，提供原创中文精品教程',
      link: 'https://www.liaoxuefeng.com/'
    },
    {
      title: '阮一峰科技周刊',
      desc: '记录每周值得分享的科技内容',
      link: 'http://www.ruanyifeng.com/blog/weekly/'
    },
    {
      title: '酷壳-CoolShell',
      desc: '享受编程和技术所带来的快乐',
      link: 'https://coolshell.cn/'
    }
    // ...
  ],
  // 备案号
  record: '码出快乐｜码出未来',
  recordLink: 'https://imxiaolong.com',
  // cyberSecurityRecord: '公安部备案文案',
  // cyberSecurityLink: '公安部备案指向链接',
  // 项目开始时间，只填写年份
  startYear: '2020',
  locales: {
    '/': {
      recoLocales: {
        homeBlog: {
          article: '文章', // 默认 文章
          tag: '标签', // 默认 标签
          category: '分类', // 默认 分类
          friendLink: '推荐' // 默认 友情链接
        },
        pagation: {
          prev: '上一页',
          next: '下一页',
          go: '前往',
          jump: '跳转至'
        }
      }
    }
  }
}