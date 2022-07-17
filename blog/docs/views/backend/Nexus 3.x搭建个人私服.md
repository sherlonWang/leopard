---
sidebar: auto
title: Nexus 3.x搭建个人私服
date: 2018-12-25
categories:
 - 后端
tags:
 - Nexus
 - 私服
 - maven
---

<Copyright link="https://imxiaolong.com/views/backend/Nexus 3.x搭建个人私服.html" />

搭建个人私服的好处就不一一介绍了，直接进入主题。

一、安装nexus3
1.以下为下载nexus-3.3.01的地址：

nexus-3.3.01_nexus3proxy-Proxy代码类资源-CSDN下载

下载完成后解压，我的放在E盘下，目录结构如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14lfgsfeaj208x04a0sk.jpg)

 进入到E:\nexus-3.2.0-01-win64\nexus-3.2.0-01\bin目录，如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14ldq4lkdj20l206574d.jpg)

2.以管理员身份运行cmd，切换到该目录下，依次运行如下命令：

```bash
C:\WINDOWS\system32>e:

E:\>cd E:\nexus-3.2.0-01-win64\nexus-3.2.0-01\bin

E:\nexus-3.2.0-01-win64\nexus-3.2.0-01\bin>nexus.exe/run
```


当出现Started Sonatype Nexus OSS 3.2.0-01表明启动成功。如果启动不成功，可能是端口号被占用，nexus默认端口号为8081，可在E:\nexus-3.2.0-01-win64\nexus-3.2.0-01\etc\目录下的nexus-default.properties中修改。

浏览器地址栏输入:http://localhost:8081/回车，可看到如下界面：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14lfqmtwkj20y30cq74z.jpg)

二、设置nexus开机自启动
上述启动方式是在对应的bin目录下运行nexus.exe/run命令启动，可是cmd窗口一不小心关闭nexus服务也就关闭了，所以将nexus设置为windows服务，就不会出现这个问题了。

依然是用管理员打开cmd切换到nexus对应的bin目录下，执行nexus.exe/install nexus3：

```bash
E:\nexus-3.2.0-01-win64\nexus-3.2.0-01\bin>nexus.exe/install nexus3
```


看到提示信息Installed service 'nexus3'表示注册服务成功。

进入系统服务列表查看如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14li9ita4j20o60dlwff.jpg)

可以看到nexus3已经设置为windows服务了，设置启动类型为自动，以后开机就会自动启动nexus3服务啦！

nexus3使用方法请看下篇：nexus3搭建私服使用教程

DONE!
