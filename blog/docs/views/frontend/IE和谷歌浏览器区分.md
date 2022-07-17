---
sidebar: auto
title: IE和谷歌浏览器区分
date: 2018-10-10
categories:
 - 前端
tags:
 - IE
 - Chrome
---

<Copyright link="https://imxiaolong.com/views/frontend/IE和谷歌浏览器区分.html" />

# 1.IE和谷歌浏览器区分

区别符号 [\9] [*] [_]，IE系浏览器均可读  \9 ，IE7和IE6可读  * ，IE6可读 _ ，所以区分非IE浏览器、IE8、IE7、IE6可以用以下样式：

```css
background:blue; /*非IE浏览器背景为蓝色*/
background:red \9; /*IE8浏览器背景为红色*/
*background:black; /*IE7浏览器背景为黑色*/
_background:yellow; /*IE6浏览器背景为黄色*/
```
