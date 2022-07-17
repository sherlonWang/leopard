---
sidebar: auto
title: 给html元素绑定数据
date: 2017-7-12
categories:
 - 前端
tags:
 - HTML
---

<Copyright link="https://imxiaolong.com/views/frontend/给html元素绑定数据.html" />

# 6.给html元素绑定数据

```html
<div id="div1" data-text="hello-world"></div>
```

```js
// 利用jquery可以快速获取绑定的数据
var text = $("#div1").data("text");
```
