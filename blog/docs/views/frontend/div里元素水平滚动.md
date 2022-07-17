---
sidebar: auto
title: div里元素水平滚动
date: 2018-8-10
categories:
 - 前端
tags:
 - DIV
 - CSS
---

<Copyright link="https://imxiaolong.com/views/frontend/div里元素水平滚动.html" />

# 4.div里元素水平滚动
css:
```css
.father{
    width:1000px;
    height:120px;
    overflow-y:hidden;
    overflow: auto;
    white-space: nowrap
}
.son{
    width: 64px;
    height: 64px;
    margin-top: 20px;
    margin-left: 20px;
    display: inline-block
}
```
html:
```html
<div class="father">
    <div class="son"></div>
</div>
```
