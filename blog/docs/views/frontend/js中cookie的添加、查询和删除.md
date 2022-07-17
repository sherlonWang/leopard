---
sidebar: auto
title: js中cookie的添加、查询和删除
date: 2018-8-10
categories:
 - 前端
tags:
 - js
 - cookie
---

<Copyright link="https://imxiaolong.com/views/frontend/js中cookie的添加、查询和删除.html" />

> Cookie，有时也用其复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）

##### 1.添加cookie

```javascript
/**
 * 添加cookie
 * @param name cookie名字
 * @param value 值
 */
function setCookie(name,value)
 
{
 
    //此 cookie 将被保存 30 天
    var Days = 30; 
 
    var exp = new Date();
 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
 
}
```

##### 2.查询cookie

```javascript
/**
 * 获取cookie
 * @param name cookie名称
 * @returns cookie的值
 */
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
 
    if (arr != null) return unescape(arr[2]);
 
    return null;
}
```

##### 3.删除cookie

```javascript
/**
 * 删除cookie
 * @param name cookie名字
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        // 这里删除操作其实是将expires过期时间设置为当前时间，使cookie立即过期
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
```

