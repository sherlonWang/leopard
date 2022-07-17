module.exports = Object.assign(
  {
      '/views/algorithm/': [
          {
              title: '数据结构与算法',
              collapsable: false,
              children: [
                  '简介'
              ]
          },
          {
              title: '复杂度分析',
              collapsable: false, // 可选的, 默认值是 true,
              children: [
                  '大O表示法','最好、最坏、平均、均摊时间复杂度分析'
              ]
          },
          {
              title: '数据结构',
              collapsable: false, // 可选的, 默认值是 true,
              children: [
                  '数组', '链表'
              ]
          }
      ]
  })
