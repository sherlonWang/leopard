---
sidebar: auto
title: macbook之「终端」
date: 2020-08-01
categories:
 - mac
tags:
 - mac
 - 终端
---

<Copyright link="https://imxiaolong.com/views/mac/macbook之「终端」.html" />

> mac 自带的终端所有命令都一个颜色，看起来比较费劲，都分不清哪是命令行，哪是提示符了，就像下面这样👇：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo6.png)

如果能给终端点颜色用以区分，那就好极了。这不，github 上已经有开源的项目了，项目名称：[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/) ,下面来介绍如何安装。

## 一、安装前准备

### 1.安装 zsh 

 版本要求不低于v4.3.9，mac 系统默认已经安装，可在终端用`zsh --version` 命令 ， 来查看 zsh 的版本。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo7.png)

### 2.安装 curl 

mac 默认已经安装

### 3.安装 git 

git 下载地址：https://sourceforge.net/projects/git-osx-installer/files/latest/download

和安装普通应用程序一样，一路默认 OK 即可，安装完后在控制台输入命令 `git version` ，如果出现以下字符，表示安装成功。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo8.png)

## 二、安装和使用 oh-my-zsh

在终端执行以下命令进行 oh-my-zsh 的安装:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装完成后在你用户根目录 `(/Users/{your name}/)` 下会生成 `.oh-my-zsh` 文件夹，**如果看不到可能被隐藏起来了，在目录下按快捷键 `⇧+⌘+.` 即可切换显示被隐藏的文件**。

好啦！现在重新打开「终端」，用 `ls` 测试一下，是不是有颜色呢。

如果你觉得默认的主题不好看，想换个主题色，请往下看。

## 三、配置文件 ` .zshrc` 的使用

细心的你可能发现，在你用户的根目录下除了 `.oh-my-zsh` 文件夹外，还有一个 `.zshrc` 文件，没错，接下来要说的就是怎么配置这个文件。

在开始配置之前需要先改一个参数值，用文本编辑器打开`.zshrc` 文件，找到 `export ZSH` 的位置，将用户名改为你自己的用户名，比如我的是 `sherlonwang` ，则该处应该为：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo9.png)

 ### 1.配置主题

 找到 `ZSH_THEME` 的位置，后面的值就是主题的名称，把它改为自己想要的主题名称即可(*注：= 右边不要有空格*)。详细的主题预览戳这里：[oh-my-zsh 主题预览](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) 

选好自己的主题，改完之后重启「终端」就能看到效果了。

如果你比较「朋克」，还可以设置随机主题，只需要将 `ZSH_THEME` 的值设为 `random` 即可，然后每次打开终端都会随机显示一种主题，是不是比较硬核😂。

当然，也可以在自己喜欢的几种主题之间进行随机显示，需要在配置文件中额外添加一个参数 `ZSH_THEME_RANDOM_CANDIDATES` ，把自己喜欢的主题名称写到该值里面，格式为 `ZSH_THEME_RANDOM_CANDIDATES=("robbyrussell" "agnoster" "cloud")` ，比如，这里是我喜欢的几种主题，那么我的配置文件为：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo10.png)

配置完后，就只能在这三种主题之间随机显示啦。

> PS：关于主题 `agnoster` 可能会出现乱码，而且格式和给的预览图相差较大，如果你想要你的终端更加炫酷一点，请移步于此 [iTerm2 + oh-my-zsh 让你的终端飞起来](https://imxiaolong.com/views/tool/iTerm2 + oh-my-zsh 让你的终端飞起来.html)

### 2.配置插件

可以看到，在 `/.oh-my-zsh/plugins`  目录下，已经安装了很多插件，只是没有激活而已。可以在配置文件 `.zshrc` 中找到 `plugins` 参数的位置，将需要激活的插件名称写到该参数值里，注意没有 `""` ，直接写插件名称即可，多个之间用空格隔开。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo11.png)

下面推荐几种比较好用的插件：

- git
- zsh-syntax-highlighting （**需要自己安装**）
- extract
- z
- sublime
- last-working-dir

------

**git** 插件是开发者常用的插件，里面包含了许多 Aliases ，对经常用 git 的人来说效率会提高许多，简单截个图来感受一下：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgosddadqw.png)

右边这么长的命令行，只需要输入左边 alias 中对应的几个字母就搞定啦！

还有许多没有列出来，大家可以去插件所在目录 `/.oh-my-zsh/plugins/`  下查看对应插件的 `README.MD` 说明文档。

------

**zsh-syntax-highlighting** 也是比较好用的插件之一，有时候命令太多记不住，输入时不知道自己写对了没，有了这个插件就不用担心啦。

命令在拼写错误时会显示红色，正确时显示绿色，可以实时提示你命令行有没有写对，就像下面这样👇：

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo12.png)

在终端输入以下命令进行安装（*注意 ...highlighting.git 和 ~/ 之间的空格*）：

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

安装完成之后会在 `～/.oh-my-zsh/custom/plugins/` 目录下看到安装的 `zsh-syntax-highlighting` 文件夹,然后在配置 `.zshrc` 文件中配置就 OK 啦！ 

------

**extract** 功能强大的解压插件，所有类型的文件解压一个命令 `x` 全搞定，只需要输入命令 `x 文件名` 即可。 比如我想解压 `~/Downloads/` 目录下的 `iTerm2-3_3_3.zip ` 文件，只需要切换到 `Downloads` 目录下使用命令 `x iTerm2-3_3_3.zip `  即可。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo13.png)

------

**z** 强大的目录自动跳转命令，会记忆你之前进入过的的目录，用模糊匹配快速跳转到你想要的目录。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgotab.gif)

------

**sublime** 插件可以用 sublime 编辑器打开文件或者文件夹(当然首先得[下载安装 sublime](http://www.sublimetext.com/3) )，常用命令如下：

```shell
st        # 直接打开sublime
st file   # 用sublime打开文件 file
st dir    # 用sublime打开目录 dir
stt       # 在sublime打开当前目录，相当于 st .
```

比如我想在终端用 `st` 命令打开根目录下的 `.zshrc` 文件，可以直接在根目录输入 `st .zshrc` 。

 ![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgosublime.gif)

------

**last-working-dir** 插件可以记录终端最后一次进入的文件目录，下次重新打开终端的时候，会自动定位到那里。

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgolast.gif)

------

以上是我常用的几个插件，官方有完整的插件说明：[https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview](https://link.jianshu.com/?t=https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview) ，根据自己的需要配置即可。

**PS：以上安装都需要保证有网（废话🤪）...**

**PPS：插件配置过多可能会导致终端启动较慢👻...**

**PPPS：附一份我的终端主题配置指南   [iTerm2之oh-my-zsh让你的终端飞起来](https://imxiaolong.com/views/mac/iTerm2之oh-my-zsh让你的终端飞起来.html) ，里面有更便捷和炫酷的操作，让你的终端飞起来～🚀**

