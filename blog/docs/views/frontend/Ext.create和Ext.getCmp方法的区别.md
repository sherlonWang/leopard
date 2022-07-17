---
sidebar: auto
title: Ext.create和Ext.getCmp方法的区别
date: 2018-10-23
categories:
 - 前端
tags:
 - ExtJS
---

<Copyright link="https://imxiaolong.com/views/frontend/Ext.create和Ext.getCmp方法的区别.html" />

# 2.Ext.create("",{})和Ext.getCmp("")方法的区别

Ext.create("",{})是创建一个组件，可以将它渲染到html页面，比如：

```js
var panel = Ext.create("Ext.panel.Panel",{});
panel.render("el");// el为html页面元素的id
```

Ext.getCmp("")是获取ext组件，前提是该组件已在页面进行过渲染。

**如果需要对组件进行操作，要用Ext.getCmp("")，而不是Ext.create("",{})**
