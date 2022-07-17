---
sidebar: auto
title: GitHub + jsDelivr + PicGo 搭建稳定的免费图床
date: 2020-08-06
categories:
 - 工具
tags:
 - 图床
 - 博客搭建
---

<Copyright link="https://imxiaolong.com/views/tool/GitHub + jsDelivr + PicGo 搭建稳定的免费图床.html" />



## 前言

经常写博客的朋友肯定知道，图片的上传和存放是一个问题，如何做到图片一次上传，到处使用呢？这就需要一个资源库来存储自己的图片了，这个专门用来管理图片的资源库就叫 **图床** 。

下面，我们用 `github 仓库 + PicGo客户端` 来搭建图床。由于国内访问 GitHub 比较慢，这里使用 [jsDelivr](http://www.jsdelivr.com/) 免费 CDN 加速。

## 搭建

### 一、新建 GitHub 仓库

新建一个仓库，注意仓库设置成 **公开** ，比如我这里新建仓库名为 `myPic` 。

### 二、生成 GitHub token 密钥

1.点击 GitHub 上你的图像，然后点击 `Settings` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806140836.png)

2.在侧边栏点击 `Developer settings` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806145155.png)

3.接着在侧边栏点击 ` Personal access tokens` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806145312.png)

4.然后点击 `Generate new token` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806145420.png)

5.接着，填写 token 的备注，比如我这里填写 `picGo-myPic` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806145646.png)

6.接着选择 token 的范围和权限，选择第一个 `Repo` :

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806150034.png)

7.最后点击 `Generate token` 生成 token 。 

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806150444.png)

8.**注意**，生成 token 后，点击密钥串右边的小图标复制 token 密钥保存起来，后面配置的时候要用到，因为关闭 GitHub 当前 token 页面后，再打开就看不到密钥了。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806150813.png)

### 三、配置 PicGo 

点击 [下载](https://github.com/Molunerfinn/picgo/releases) PicGo，选择对应的系统软件包，下载安装：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806151903.png)

注意：带 `beta` 的为测试版，可能不大稳定，可以拉到下面下载稳定版。

打开软件主界面后，点击 `图床设置` ，选择 `GitHub图床`，并填写相应的信息：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806154403.png)

- 设定仓库名：前面新建的仓库，格式：`<用户名>/<仓库名>`
- 设定分支名：填写主分支 `master` 即可
- 设定 Token：前面生成的 token 密钥
- 指定存储路径：按你自己的需求填写。比如我这里填写 `picgo/` ，到时候图片就会存储在 仓库 `picgo` 文件夹下
- 设定自定义域名：图片上传后，PicGo 会按照 `自定义域名+上传的图片名` 的方式生成访问链接，此处我们填写 `jsDelivr` 的CDN加速地址，格式：`https://cdn.jsdelivr.net/gh/<用户名>/<仓库名>`

为了避免仓库中图片名称重复，可以设置以时间戳重命名上传的文件。点击左侧 `PicGo设置` 菜单，找到 `时间戳重命名` 并开启开关：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806154414.png)

配置完成后，点击左侧菜单栏的 `上传区` ，注意图片上传要选择 Github 图床，点击选择图片或者拖拽图片到上传区进行上传，也可以复制图片通过剪切板快捷上传：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806154429.png)

上传完成后，点击左侧菜单栏的 `相册` 就可以看到刚才上传的图片啦。如果上传成功， GitHub 仓库下就会出现刚才上传的图片。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806154438.png)

选择要粘贴的格式，点击图片下方的复制按钮，就可以得到你想要的图片 url 啦。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo20200806154756.png)

为了使上传时更加快速，建议上传前先将图片压缩，这里推荐一个网站：[TinyPNG](https://tinypng.com/) ，亲测压缩效果不错。

::: danger 

如果出现上传失败的情况，可以在 `剪切板上传`、`选择上传` 、`拖拽上传` 3 种方式中换一种方式上传。

网络不好的情况下也有可能出现上传失败的情况。

:::
