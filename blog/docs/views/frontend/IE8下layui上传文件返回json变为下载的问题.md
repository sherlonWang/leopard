---
sidebar: auto
title: IE8下layui上传文件返回json变为下载的问题
date: 2019-12-11
categories:
 - 前端
tags:
 - CSS
 - Layui
 - IE8
---

<Copyright link="https://imxiaolong.com/views/frontend/IE8下layui上传文件返回json变为下载的问题.html" />

> 最近项目需要兼容IE8（没办法...硬性规定绕不过去），由于前端大多数项目已经抛弃IE8了，所以就用了依然对IE8不离不弃的**layui**。当使用layui的upload组件时，问题就来了，IE8下测试要么没权限，要么出现下载框，搞了半天，终于找到了解决办法，可以同时兼容IE8和谷歌。

刚开始用的谷歌测试，一切都没有问题。

前端代码正常使用官方文档，在回调函数done里处理返回结果：

```js
done: function (response) {
    //上传完毕回调
    console.log(response);
}
```

后端使用的springboot，controller类使用@RestController,方法的返回结果会自动转换成json格式，相当于在方法上加了个@ResponseBody注解。（坑就在这里，谷歌是没有问题，但是在IE8下没用，会提示没有权限），于是看官方文档，说是需要返回正确的json字符串，猜测IE8下返回的结果没有解析成json字符串，于是把返回结果改为String,手动把返回对象转为json字符串，果然就不报错了。

之前的返回值类型：

```java
@PostMapping(value = "/upload")
public JsonResult uploadFile...
```

修改之后的返回值类型：

```java
@PostMapping(value = "/upload")
public String uploadFile...
  // 把JsonResult转为json字符串返回
```

改完返回值类型后，没有报错了，但是出现另一个问题，IE8下返回的结果老是出现下载框，将返回的json字符串下载为文件，官方对这个有说明：

> 注意1：你不一定非得按照上述格式返回，只要是合法的 JSON 字符即可。其响应信息会转化成JS对象传递给 *done* 回调。
> 注意2：如果上传后，出现文件下载框（一般为ie下），那么你需要在服务端对response的header设置 *Content-Type: text/html*

于是在注解里加上content-type，如下：

```java
@PostMapping(value = "/upload",produces="text/html;charset=UTF-8")
public String uploadFile...
```

再次测试，在IE8和谷歌都没问题了😄。

上面写的有点啰嗦，主要记录了下我开发测试的过程，主要有2点需要注意：

### 1.后台方法返回类型用String（json字符串，layui会自动把json串转化为json对象）

### 2.方法上的注解加 produces="text/html;charset=UTF-8"




