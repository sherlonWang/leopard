module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  { text: '时间线', link: '/timeline/', icon: 'reco-date' },
  // 自定义菜单也可以多级目录，路由默认为文件夹名称的层级关系
  {text: '收藏', link: '/bookmark/', icon: 'reco-tag'},
  {
    text: '关于',
    icon: 'reco-account',
    items: [
      {text: '关于作者', link: '/aboutme/', icon: 'reco-account' },
      { text: 'CSDN', link: 'https://blog.csdn.net/weixin_38483589', icon: 'reco-csdn' },
      { text: 'B站', link: 'https://space.bilibili.com/398079956', icon: 'reco-bilibili' },
    ]
  },
  {
    text: 'GitHub', link: 'https://www.github.com/sherlonWang', icon: 'reco-github'
  }
];