const themeConfig = require('./config/theme/')

module.exports = {
    title: "IT三脚猫",
    description: '码出快乐 ｜ 码出未来',
    dest: 'dist',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
    ],
    theme: 'reco',
    themeConfig,
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [1,2, 3, 4, 5]
        }
    },
    plugins: [
        '@vuepress/medium-zoom',
        'flowchart',
        '@vuepress/active-header-links',
        // ['vuepress-plugin-rss', {
        //     site_url: 'https://imxiaolong.com/'
        // }],
        ['one-click-copy', { // 代码块复制按钮
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
            copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
            duration: 1000, // prompt message display time.
            showInMobile: false // whether to display on the mobile side, default: false.
        }],
        // ["cursor-effects"],
        // ['ribbon']
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
}
