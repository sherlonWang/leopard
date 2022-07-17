---
sidebar: auto
title: iTerm2之oh-my-zsh让你的终端飞起来
date: 2020-08-01
categories:
 - mac
tags:
 - mac
 - 终端
 - iTerm2
---

<Copyright link="https://imxiaolong.com/views/mac/iTerm2之oh-my-zsh让你的终端飞起来.html" />

> 相信使用 Mac 系统的朋友或多或少都有了解到一款终端神奇**「iTerm2」** ，就是上面这位👆，它不仅能完美代替 macOS 自带的终端，还可以做一些非常方便而且神奇的操作，下面来看看怎么使用它吧！

配置好之后大概是这个样子的，多窗口之间切换简直不能更爽了，而且颜值也比较高👍。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgoiterm233.gif)

主题是用的是 `oh-my-zsh` 的 `agnoster` ，接下来也以这个主题为例来说明怎么配置。

## 一、安装 iTerm2

下载地址：[https://www.iterm2.com/downloads.html](https://link.jianshu.com/?t=https%3A%2F%2Fwww.iterm2.com%2Fdownloads.html)

根据自己的 os 版本下载对应的 iTerm2 版本。下载完之后解压，会得到一个可执行文件，可以直接双击打开，可以把它加入到 Applications 里面，下次直接去应用里面点击图标打开。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo14.png)

iTerm2 一般配合 oh-my-zsh 一起玩，效果更佳。关于 `oh-my-zsh` 的安装和配置可以看这篇文章 [matchbook 之「终端」](https://imxiaolong.com/views/tool/macbook之「终端」.html)。

## 二、iTerm2 和 oh-my-zsh 的配置

### 1.字体

由于 `agnoster` 主题需要用到 `Meslo LG M Regular for Powerline` 字体，否则终端里某些符号会出现乱码。

字体下载地址：[Meslo LG M Regular for Powerline.ttf](https://github.com/powerline/fonts/blob/master/Meslo Slashed/Meslo LG M Regular for Powerline.ttf)

下载完后直接双击安装即可。

然后打开 iTerm2 ，按 `Command + ,` 键（或者点击屏幕左上角 iTerm2 ），打开 Preferences 配置界面，然后`Profiles -> Text -> Font -> Chanage Font`，选择 **Meslo LG M Regular for Powerline** 字体，可以看到，终端乱码已经消失。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgoziti.gif)

------

### 2.配色

如果你觉得 iTerm2 默认的配色方案不好看，也可以进行修改，按 `Command + ,` 键（或者点击屏幕左上角 iTerm2 ），打开 Preferences 配置界面，然后`Profiles -> Colors -> Color Persets` ，选择你想要的配色方案。如果你觉得我的配色比较好看，这里也附上我的配置文件：[myCustomColorTheme.itermcolors](https://www.kuangxiaogou.com/filerun/wl/?id=XTw2jCtND12o8DI8hviwcNet7TZ6xaJf) 。

::: details 查看下载链接

```sh
链接:https://pan.baidu.com/s/1Kr5gQ0EFRQXlknJO-8jBUw  
密码:uerj
```

:::

下载完后，找到 `myCustomColorTheme.itermcolors` 文件，双击，会提示是否导入 iterm2 ，选择是即可，然后在上面 Color Persets 中选择刚才导入的配色方案。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo15.png)

### 3.常用快捷键和技巧

#### 隐藏用户主机名：

如果你使用 `agnoster` 主题，在终端可以看到我们的用户名和主机名都显示在命令行里，显得比较累赘，比如下面这样👇

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo16.png)

其实我们可以通过修改 `.zshrc` 配置文件，来隐藏用户名和主机名。打开 `.zshrc` 文件，在里面加一句 ：

```bash
#kuangxiaogou是我的用户名，需要改为你自己的用户名
DEFAULT_USER="kuangxiaogou"
```

注意：用户名一定要写对，不然没效果。改完之后再重启 iTerm2 是不是已经隐藏用户名和主机名啦👇。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo17.png)

------

#### 多任务分屏操作

有时候，我们需要同时处理多个终端任务，这个时候，终端分屏就可以发挥它的威力了。

`⌘ + T ` 可以新建一个终端 tab 页。`⌘ + 数字` 可以切换对应的 tab 页。

可能有时候我们需要同时看到多个终端任务的情况，在终端 tab 页之间来回切换就满足不了了，这时候我们可以用它的分屏操作，来划分一个类似于看板的终端布局。像下面这样👇：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo18.png)

使用快捷键 `⌘ + D` 在当前窗口竖直分屏， `⌘ + ⇧ + D` 在当前窗口水平分屏，根据自己的需要划分一个自己的任务窗口吧。

#### 常用快捷键

`⌘ + ,` ：快速打开 iTerm2 偏好设置（在 iTerm2 窗口被激活的情况下 ）

`⌥ + 空格` ：快速隐藏和显示 iTerm2 （这个根据自己的偏好进行设置）

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo19.png)

**智能选中**：在 iTerm2 中，双击选中，三击选中整行，四击智能选中（智能规则可[配置](https://link.jianshu.com/?t=http%3A%2F%2Fwww.iterm2.com%2Fdocumentation-smart-selection.html)），并且会将选中的内容自动复制到剪切板。

**TAB 键自动补全**：我们在敲命令的时候，按 TAB 键 iTerm2 会自动补充命令信息，或者将可供选择的命令行列出来，再次按 TAB 键进入选择列表，选择需要的命令。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgotab.gif)

`⌘ + → ` `⌘ + ← `：在命令行首和行尾切换，需要设置一下 iTerm2 。

打开 iTerm2，按`Command + ,`键，打开 `Preferences`配置界面，然后Profiles → Keys → Load Preset... → Natural Text Editing 就 OK 了。

`⌥ + → ` `⌥ + ← `：在命令行各单词之间移动。

 `⌃(control) + U`：清除当前命令行。

 `⌃(control) + L`：清屏。

 `⌘ + ⏎`：切换全屏。

 `⌘ + /`：聚焦光标位置。

 `⌘ + F`：查找。

> PS：目前这些快捷键是自己比较常用的，当然 iTerm2 快捷键以及使用技巧远远不止于此，欢迎大家可以一起来交流👏
