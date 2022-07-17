---
sidebar: auto
title: js删除数组中的元素
date: 2018-8-10
categories:
 - 前端
tags:
 - js
---

<Copyright link="https://imxiaolong.com/views/frontend/js删除数组中的元素.html" />

# 8.js删除数组中的元素

```js
// 比如，想要删除数组中foo
var arrays = ['foo','bar','boo','far']; 
arrays.forEach(function(item, index, arr) {
    if(item === 'foo') {
        arr.splice(index, 1);
    }
});
```
