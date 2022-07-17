---
sidebar: auto
title: js中给元素注册事件，防止重复注册
date: 2017-12-10
categories:
 - 前端
tags:
 - js
 - 事件绑定
---

<Copyright link="https://imxiaolong.com/views/frontend/js中给元素注册事件，防止重复注册.html" />

# 5.js中给元素注册事件，防止重复注册

```js
// 注册事件
var event = $("#el").data("events");
if (!event || !event["click"]) {
    // 给下载按钮注册单机事件
     $("#el").on('click',function(){
         // to do something. 
     })
}
```
