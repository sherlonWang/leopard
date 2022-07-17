---
sidebar: auto
title: Git项目管理
date: 2018-12-25
categories:
 - 后端
tags:
 - Git
 - 版本管理
---

<Copyright link="https://imxiaolong.com/views/backend/Git项目管理.html" />

一、将Git上的项目克隆到本地
本地新建文件夹，如：E:/gittest

1.以管理员身份打开cmd命令，切换到上面新建的目录，依次执行cmd命令如下：

```bash
C:\WINDOWS\system32>E:

E:\>cd E:/gittest

E:\gittest>git clone 你的git仓库地址
```

2.执行完以上命令，控制台会显示100%，表示已经完全拷到本地：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14lm91ez6j20pr04d74g.jpg)

 再看刚才建的gittest文件夹下，已经有了项目文件：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14m9j92oqj20ga07uglp.jpg)

二、将本地项目推送到Git管理
1.切换到要待推送项目目录，比如我想将本地E:/test下的项目托管到Git。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14ma1m53xj20gw07rt8s.jpg)

以管理员身份执行cmd命令，切换到E:/test目录下，依次执行如下命令:

1.在当前目录新建一个Git代码库

```bash
e:/test>git init
```

2.增加一个新的远程仓库（以下以github为例，userName为自己github用户名，projectName为项目名称），命名为origin 

```bash
e:/test>git remote add origin https://github.com/userName/projectName.git
```

3.将当前目录下代码推送到Git仓库中，注意后面的点.

```bash
e:/test>git add .
```

稍等一会，等推送完毕。

4.添加提交信息

```bash
e:/test>git commit -m "Initial commit"
```

5.推送分支到master

```bash
e:/test>git push -u origin master
```

完成后在相关网站就可以看到新推送的项目啦。
