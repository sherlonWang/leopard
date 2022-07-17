const themeReco = require('./themeReco.js')
const nav = require('../nav/')
const sidebar = require('../sidebar/index')

module.exports = Object.assign({}, themeReco, {
    mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
    nav,
    sidebar,
    // 搜索设置
    search: true,
    // displayAllHeaders: true,
    searchMaxSuggestions: 10,
})
