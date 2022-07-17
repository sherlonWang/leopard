---
sidebar: auto
title: macbook之「程序坞」
date: 2020-08-01
categories:
 - mac
tags:
 - mac
 - 程序坞
---

<Copyright link="https://imxiaolong.com/views/mac/macbook之「程序坞」.html" />

> 关于程序坞的基本设置可以打开「系统偏好设置」⇨「程序坞」，根据自己的需要进行设置即可。以下介绍一些隐藏的技巧，让你的程序坞与众不同起来～

## 一、如何在程序坞设置空白间隔

有时候，程序坞中应用图标太多，看起来比较杂乱无章，如果将相同类型的应用放在一起，并且能够将它们隔开，是不是就直观很多呢，像下图这样👇

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgowqeqw.png)

实现这个效果要借助于「终端」这个应用，首先 `⌘+空格` 打开 「聚焦搜索」, 搜索「终端」找到对应图标双击打开：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo1.png)

接下来在终端输入以下命令，按回车键，可以看到程序坞左侧栏的右边会出现一个空格：

`defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock`

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo2.png)

如果想要添加多个空格，重复执行该条命令即可。

如果想要删除空格，将鼠标移到空格上，双指轻点，会弹出提示「从程序坞中移除」，点击移除即可。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo3.png)

接下来鼠标单击按住空格，把它拖到想要的位置即可。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo4.png)

------

同样，如果想要在程序坞右侧栏添加空格，在终端执行以下命令：

`defaults write com.apple.dock persistent-others -array-add '{tile-data={}; tile-type="spacer-tile";}' ;killall Dock`

如果觉得默认的空格有点大，还可以添加小号的空格，在上面命令行 `spacer-title` 前加上 `small-` 即可，命令如下：

`defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="small-spacer-tile";}'; killall Dock`



## 二、如何设置让应用隐藏时图标出现半透明效果

> Mac 用户习惯用 `⌘+H` 将暂时不用的应用程序给隐藏起来，默认的 Mac 设置无法区分隐藏和未隐藏的应用，我们可以将隐藏的应用图标变成半透明效果，像这样👇：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo5.png)

可以看到，微信被隐藏，图标变成半透明啦。

只需要在终端执行以下命令即可：

`defaults write com.apple.Dock showhidden -bool YES; killall Dock`

如果要取消这种半透明效果，把以上命令中 `YES` 改为 `NO` ，在终端执行就行啦：

`defaults write com.apple.Dock showhidden -bool NO; killall Dock`


