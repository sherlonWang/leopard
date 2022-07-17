---
sidebar: auto
title: Ext 表格清除缓存问题
date: 2018-10-23
categories:
 - 前端
tags:
 - ExtJS
---

<Copyright link="https://imxiaolong.com/views/frontend/Ext 表格清除缓存问题.html" />

# 3.Ext 表格清除缓存问题

加一个 beforerender 监听事件：

```js
 listeners:{
                beforerender : function() {
                    // 此处 me 代表当前表格
                    me.getStore().loadData([],false);
                }
            }
```
