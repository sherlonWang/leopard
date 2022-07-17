---
title: MongoDB的安装与使用
date: 2019-08-01
categories:
 - 后端
tags:
 - 数据库
 - mongodb
 - mongodb集群
sidebar: auto
---

以下为本人纯手码文章，来记录自己学习搭建 mongodb 的过程。
<!-- more -->

<Copyright link="https://imxiaolong.com/views/backend/mongodb的安装与使用.html" />

> 系统版本：CentOS Linux release 7.7.1908 (Core)
>
> mongodb版本：4.2.8

## 一、安装

### 1.下载

mongodb官方下载通道：[https://www.mongodb.com/try/download](https://www.mongodb.com/try/download)

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgoimage-20200724103427519.png)

打开官网下载页面，依次点击`On-Premises` > `MongoDB Communioty Server` ,选择mongo版本（默认为当前 `current` 版本），选择自己服务器对应的系统及版本，选择 `tgz` 压缩包。

::: tip 说明

由于本人搭建的是公司内部局域网集群，服务器连不上互联网，所以先将压缩包下载到可以连接互联网的电脑上，再拷贝到服务器，这种情况直接点击 `Download` 按钮下载即可。

如果服务器可以连接互联网，就点击 `Download` 左边的 `Copy Link`，复制下载链接， 使用 `wegt` 命令下载即可。`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.8.tgz`

:::

### 2.解压并配置环境变量

#### 拷贝到远程服务器

首先拷贝 tgz 压缩包到服务器（如果是在服务器上直接下载，可跳过此步）：

```sh
scp local_file remote_user@remote_ip:remote_folder
```

`local_file`：本机（source）文件绝对路径

`remote_user`：远程（target）主机用户名

`remote_ip`：远程（target）主机ip

`remote_folder`：远程（target）主机文件位置

比如如下命令表示将本机 `mongodb-linux-x86_64-rhel70-4.2.8.tgz` 文件拷贝到用户名为` user01` 的远程主机 `192.1.2.3` 的根目录下。

```sh
scp /Users/xxx/Downloads/mongodb-linux-x86_64-rhel70-4.2.8.tgz user01@192.1.2.3:/
```

执行完 scp 命令后，如果提示 `Are you sure you want to continue...` 命令，输入 ` yes` ，回车，然后输入远程服务器用户对应的密码即可。

连接远程服务器，终端输入以下命令，查看根目录下压缩包文件:

::: tip 提示
`[root@cdhmaster ..]#` 后面的才是具体的命令
:::

```sh
[root@cdhmaster ~]# cd /
[root@cdhmaster /]# ls
bin  boot  dev  dfs  etc  home  lib  lib64  media  mnt  mongodb-linux-x86_64-rhel70-4.2.8.tgz  opt  proc  root  run  sbin  srv  sys  tmp  upload  usr  var
```

 可以看到 `mongodb-linux-x86_64-rhel70-4.2.8.tgz` 已经成功拷贝到根目录下。

#### 解压到指定目录并重命名

接着将压缩包解压到 `/usr/local/` 目录下：

```sh
[root@cdhmaster /]# tar -xzvf mongodb-linux-x86_64-rhel70-4.2.8.tgz -C /usr/local/
```

可以切换到 `/usr/local/` 目录下查看解压的文件夹：

```sh
[root@cdhmaster /]# cd usr/local/
[root@cdhmaster local]# ls
bin  etc  games  include  lib  lib64  libexec  mongodb-linux-x86_64-rhel70-4.2.8  perl-5.26.1  sbin  share  src
```

可以看到解压后的文件夹 ` mongodb-linux-x86_64-rhel70-4.2.8`  ，为了后面使用方便，将文件夹名字改简短点：

```sh
[root@cdhmaster local]# mv mongodb-linux-x86_64-rhel70-4.2.8 mongodb4.2.8
```

查看解压后的文件夹内容：

```sh
[root@cdhmaster local]# ls
bin  etc  games  include  lib  lib64  libexec  mongodb4.2.8  perl-5.26.1  sbin  share  src
[root@cdhmaster local]# cd mongodb4.2.8/
[root@cdhmaster mongodb4.2.8]# ls
bin  LICENSE-Community.txt  MPL-2  README  THIRD-PARTY-NOTICES  THIRD-PARTY-NOTICES.gotools
```

`mongodb` 免安装，此时 `/usr/local/mongodb4.2.8` 就是它的安装位置。

#### 配置环境变量

接下来配置 mongodb 的环境变量，为什么要配置环境变量？

> 因为在没有配置环境变量的时候，想要使用 mongo 命令，只能在 mongo 安装目录 `/bin` 目录下才能执行，其他地方不认识 mongodb 。而配置环境变量以后，相当于告诉服务器，`hey，哥们，这是 mongodb 的安装位置，以后想使用就去这找吧。`，所以在服务器任何位置都可以使用 mongodb 命令。

linux 系统有一个文件 `profile` 用来管理环境变量，文件路径为 `/etc/profile` ，使用 linux 自带的 `vi` 命令修改该文件：

```sh
[root@cdhmaster /]# vi /etc/profile
```

可以看到该文件内容大致如下：（篇幅原因省略中间部分）

```sh
# /etc/profile

# System wide environment and startup programs, for login setup
# Functions and aliases go in /etc/bashrc

# It's NOT a good idea to change this file unless you know what you
# are doing. It's much better to create a custom.sh shell script in
# /etc/profile.d/ to make custom changes to your environment, as this
# will prevent the need for merging in future updates.
...
...
...
unset i
unset -f pathmunge
```

此时终端处于 `vi` 命令状态，输入 `i` 进入编辑状态，可以看到终端最底部出现 `INSERT` 字样，表示可以对 `profile` 文件进行编辑了。

```sh
# /etc/profile

# System wide environment and startup programs, for login setup
# Functions and aliases go in /etc/bashrc

# It's NOT a good idea to change this file unless you know what you
# are doing. It's much better to create a custom.sh shell script in
# /etc/profile.d/ to make custom changes to your environment, as this
# will prevent the need for merging in future updates.
...
...
...
unset i
unset -f pathmunge
-- INSERT --
```

把光标移到文件最后面，输入以下内容：

```sh
export MONGODB_HOME=/usr/local/mongodb4.2.8
export PATH=$MONGODB_HOME/bin:$PATH
```

其中 `MONGODB_HOME` 是 mongodb 的安装目录。此时终端是这样的:

```sh
# /etc/profile

# System wide environment and startup programs, for login setup
# Functions and aliases go in /etc/bashrc

# It's NOT a good idea to change this file unless you know what you
# are doing. It's much better to create a custom.sh shell script in
# /etc/profile.d/ to make custom changes to your environment, as this
# will prevent the need for merging in future updates.
...
...
...
unset i
unset -f pathmunge

export MONGODB_HOME=/usr/local/mongodb4.2.8
export PATH=$MONGODB_HOME/bin:$PATH
-- INSERT --
```

修改完成后，按 `esc` 推出编辑模式，可以看到 `INSERT` 字样消失。

然后输入 `:wq` 命令回车（注意有冒号`:`），表示保存并退出 `vi` 命令（`vi` 退出是不是很刺激🌝）。

改完配置文件，想要它立即生效，执行以下命令就可以了：

```sh
[root@cdhmaster /]# source /etc/profile
```

接着，输入 `mongo -version` 命令，看到关于 mongo 相关的信息就说明配置成功啦。

```sh
[root@cdhmaster /]# mongo -version
MongoDB shell version v4.2.8
git version: 43d25964249164d76d5e04dd6cf38f6111e21f5f
OpenSSL version: OpenSSL 1.0.1e-fips 11 Feb 2013
allocator: tcmalloc
modules: none
build environment:
    distmod: rhel70
    distarch: x86_64
    target_arch: x86_64
```

## 二、使用

前面介绍了 mongodb 的安装方法，接下来分别从 `单机版` 、`副本集` 、`分片集群` 三方面来介绍 mongodb 的使用。

### 1.单机版

前面 mongodb 安装目录为：`/usr/local/mongodb4.2.8/`

#### 命令行参数启动

::: tip 注意

mongodb 启动时必须得指定数据库目录

:::

在 mongodb 安装目录下创建 data 和 log 目录：

```sh
[root@cdhmaster ~]# cd /usr/local/mongodb4.2.8/
[root@cdhmaster mongodb4.2.8]# mkdir -p data log
[root@cdhmaster mongodb4.2.8]# ls
bin  data  LICENSE-Community.txt  log  MPL-2  README  THIRD-PARTY-NOTICES  THIRD-PARTY-NOTICES.gotools
```

启动 mongod 服务：

```sh
[root@cdhmaster log]# mongod --dbpath /usr/local/mongodb4.2.8/data/ --logpath /usr/local/mongodb4.2.8/log/mongo.log --logappend --fork
```

`--dbpath`：数据库存储位置

`--logpath`：日志存储位置

`--logappend`：日志采用追加模式，不用每次启动都创建一个日志文件

`--fork`：后台运行 mongo 服务

mongodb 默认 ip 和 端口为 `127.0.0.1:27017`，在终端连接 mongo 服务：

```sh
[root@cdhmaster /]# mongo --port=27017
MongoDB shell version v4.2.8
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("515f600d-eded-426e-bb1f-7725aefa80a3") }
MongoDB server version: 4.2.8
...
...
...

> 
```

出现如上命令就表示连接成功啦。此时的终端就是一个 mongodb 客户端了，然后就可以愉快的操作 mongodb 啦。

#### 配置文件启动

可以看到，上面通过命令行参数启动比较麻烦，需要输入一大堆参数，看起来很不简洁而且命令容易出错。那有没有简单的方式呢？有。可以通过指定配置文件的方式启动。

在 mongodb 安装目录下新建 `conf` 文件夹，`conf` 文件夹下新建 `mongo.conf` 文件。

```sh
[root@cdhmaster /]# cd /usr/local/mongodb4.2.8/
[root@cdhmaster mongodb4.2.8]# mkdir -p conf
[root@cdhmaster /]# cd conf
[root@cdhmaster /]# vi mongo.conf
```

输入`i` 进入编辑模式，将以下内容复制到 `mongo.conf` 中，输入 `:wq` 保存并退出，至此配置文件就准备好啦。

`mongo.conf` 文件内容如下：

```yaml
systemLog:
  # MongoDB发送所有日志输出的目标指定为文件
  destination: file
  # 配置日志输出路径
  path: "/usr/local/mongodb4.2.8/log/mongo.log"
  # 当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾
  logAppend: true
storage:
  # 数据存储路径
  dbPath: "/usr/local/mongodb4.2.8/data"
  # 开启日志
  journal:
    #启用或禁用持久性日志以确保数据文件保持有效和可恢复。
    enabled: true
processManagement:
  # 执行时 fork 出一个新进程
  # 启用在后台运行mongos或mongod进程的守护进程模式
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/usr/local/mongodb4.2.8/log/mongod.pid"
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.1.2.3
  port: 27017
```

接下来通过配置文件来启动 `mongo`服务：

 首先，关掉前面启动的 mongo 服务，有两种方式：

1⃣️正常关闭：

连接 mongo 服务后，使用 admin 数据库，执行 db.shutdownServer() 命令：

```js
> use admin
switched to db admin
> db.shutdownServer()
```

2⃣️快速关闭：

查看 mongod 服务进程 id , 结束 id 即可：

```sh
[root@cdhmaster /]# ps -ef|grep mongo
root     15775     1  0 17:37 ?        00:00:01 mongod --dbpath /usr/local/mongodb4.2.8/data/ --logpath /usr/local/mongodb4.2.8/log/mongo.log --logappend --fork
root     16539  3393  0 17:41 pts/1    00:00:00 grep --color=auto mongo
```

找到 `mongod` 服务对应的进程，可以看到上面进程 id 为 `15775` ，结束该进程：

```sh
[root@cdhmaster /]# kill -2 15775
```

如果提示不能杀掉进程，可以强制执行，在命令后面加 `/f` 。

再次执行 `ps -ef|grep mongo` 命令发现 `mongod`服务已经不见啦。

好了，关闭之前的 `mongod` 服务后，执行以下命令通过配置文件启动，出现如下信息则启动成功:

```sh
[root@cdhmaster /]# mongod -f /usr/local/mongodb4.2.8/conf/mongo.conf 
about to fork child process, waiting until server is ready for connections.
forked process: 18019
child process started successfully, parent exiting
```

如果出现错误，如下：

```sh
[root@cdhmaster /]# mongod -f /usr/local/mongodb4.2.8/conf/mongo.conf 
about to fork child process, waiting until server is ready for connections.
forked process: 17767
ERROR: child process failed, exited with error number 48
To see additional information in this output, start without the "--fork" option.
```

检查配置文件是否有写错的地方，比如 `bindIp` 有没有错误。检查完启动成功后就可以正常使用 mongodb 啦。

#### 添加安全认证

mongodb 默认情况下没有用户认证，只要知道 mongo 服务 ip 和 port ，就可以对任意数据库进行任意操作，这是非常危险的。所以 mongodb 官方建议通过以下手段来保障 mongodb 安全：

1⃣️：使用新端口替换默认的27017端口

2⃣️：网络隔离，最好将mongodb部署到公司内网

3⃣️：开启安全认证。客户端连接时需要用户密码

::: tip 补充

常用内置角色:

- 数据库用户角色:read、readWrite

- 所有数据库用户角色:readAnyDatabase、readWriteAnyDatabase、 userAdminAnyDatabase、dbAdminAnyDatabase

- 数据库管理角色:dbAdmin、dbOwner、userAdmin
- 集群管理角色:clusterAdmin、clusterManager、clusterMonitor、hostManager
- 备份恢复角色:backup、restore
- 超级用户角色:root 

- 内部角色:system

常用角色权限说明：

| 角色                 | 权限描述                                                     |
| -------------------- | ------------------------------------------------------------ |
| read                 | 可以读取指定数据库中任何数据                                 |
| readWrite            | 可以读写指定数据库中任何数据，包括创建、重命名、删除集合     |
| userAdmin            | 可以在指定数据库创建和修改用户                               |
| dbAdmin              | 可以读取指定数据库以及对数据库进行清理、修改、压缩、获取统 计信息、执行检查等操作 |
| readAnyDatabase      | 可以读取所有数据库中任何数据(除了数据库config和local之外)    |
| readWriteAnyDatabase | 可以读写所有数据库中任何数据(除了数据库config和local之外)    |
| userAdminAnyDatabase | 可以管理所有数据库上的用户权限（除了数据库config和local之外) |
| dbAdminAnyDatabase   | 可以读取任何数据库以及对数据库进行清理、修改、压缩、获取统 计信息、执行检查等操作(除了数据库config和local之外 |
| clusterAdmin         | 可以对整个集群或数据库系统进行管理操作                       |
| backup               | 备份MongoDB数据最小的权限                                    |
| restore              | 从备份文件中还原恢复MongoDB数据(除了system.profile集合)的权限 |
| root                 | 超级账号，超级权限                                           |

:::

接下来通过安全认证来确保 mongodb 的数据安全。

连接之前启动的 mongo 服务，使用 `admin` 数据库，创建用户 `test`，密码为 `123456` :

```sh
> use admin
switched to db admin
> db.createUser({"user":"test","pwd":"123456","roles":["root"]})
Successfully added user: { "user" : "test", "roles" : [ "root" ] }
```

出现以上信息表示创建用户成功。

上面创建的用户 `test` 具有 `root` 超级管理员的权限，自己可以根据需要分配其他的角色。

创建完成后，关闭 `mongod` 服务，编辑 `mongo.conf` 配置文件，开启认证：

```yaml
...
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.1.2.3
  port: 27018
security:
  # 开启认证
  authorization: enabled
```

然后重新启动 `mongod` 服务，连接服务，发现打印信息比之前少了：

```sh
[root@cdhmaster /]# mongo --port=27017
MongoDB shell version v4.2.8
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("c1208b5f-54a4-474f-8a61-fed55d46f385") }
MongoDB server version: 4.2.8
> 
```

查看数据库信息，发现没有列出默认的 `admin`、`config`、`local` 数据库：

```sh
> use admin
switched to db admin
> show dbs
> 
```

这是因为已经开启了认证，需要认证用户才能查看数据库信息。接下来进行认证：

```sh
> use admin
switched to db admin
> db.auth("test","123456")
1
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

使用 `db.auth()` 命令认证，打印 `1` 表示认证成功，再次 `show dbs`就可以看到数据库啦。 

以上用户具有 `root` 超级管理员权限，可以操作所有数据库所有权限，安全风险比较高。

一般比较常见的做法是专门创建一个具有 `userAdminAnyDatabase` 权限的用户，该用户只负责创建用户并分配权限。

```sh
> use admin
switched to db admin
> db.createUser({user:"system",pwd:"system",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
Successfully added user: {
        "user" : "system",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                }
        ]
}
```

上面创建的 `system` 用户只负责创建用户并分配权限。

::: tip 举例

假如现在有一个需求，给数据库 `mydb` 分配用户，要求具有读写数据库的权限

:::

首先用 `system` 用户进行认证登陆，然后创建用户分配 `readWrite` 角色：

```sh
> use admin
switched to db admin
> db.auth("system","system")
1
> db.createUser({user:"test",pwd:"123456",roles:[{role:"readWrite",db:"mydb"}]})
Successfully added user: {
        "user" : "test",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "mydb"
                }
        ]
}
```

这样用户 `test` 就创建好了，用 `test` 进行认证，就只能看到 `mydb` 数据库了：

```sh
> use admin
switched to db admin
> db.auth("test","123456")
1
> show dbs
mydb
```

::: tip 举例

假如现在有另一个需求，创建某用户，可以读写 `mydb` 数据库，只能读 `yourdb` 数据库

:::

可以这样，给用户同时授权不同的数据库权限：

```sh
> use admin
switched to db admin
> db.auth("system","system")
1
> db.createUser({user:"test1",pwd:"123456",roles:[{role:"readWrite",db:"mydb"},{role:"read",db:"yourdb"}]})
Successfully added user: {
        "user" : "test1",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "mydb"
                },
                {
                        "role" : "read",
                        "db" : "yourdb"
                }
        ]
}
```

这样用户 `test1` 就创建好了，用 `test1` 进行认证，可以看到 `mydb` 和 `yourdb` 数据库：

```sh
> use admin
switched to db admin
> db.auth("test1","123456")
1
> show dbs
mydb
yourdb
```

但是向 `yourdb` 数据库写入数据时，会报错，因为对 `yourdb` 只具有读的权限：

```sh
> use yourdb
switched to db yourdb
> db.testCollection.insert({name:"abc"})
WriteCommandError({
        "ok" : 0,
        "errmsg" : "not authorized on readdb to execute command { insert: \"testCollection\", ordered: true, lsid: { id: UUID(\"2fb81663-15e2-4c6d-84d1-3ca40b5128fe\") }, $db: \"yourdb\" }",
        "code" : 13,
        "codeName" : "Unauthorized"
})
```

#### 常用用户及角色权限配置

| 用户      | 角色                 | 所属数据库           | 说明                                         |
| --------- | -------------------- | -------------------- | -------------------------------------------- |
| root      | root                 | admin                | 超级管理员                                   |
| system    | userAdminAnyDatabase | admin                | 系统管理员，负责创建所有数据库用户和分配权限 |
| userAdmin | userAdmin            | testdb（业务数据库） | 业务管理员，负责在业务库中创建用户和分配权限 |
| user      | readWrite            | testdb（业务数据库） | 普通业务用户                                 |



### 2.副本集(Replica Set)

前面介绍了单机版的使用方式，不难发现，虽然做了安全认证，但是在面对如服务器宕机、硬盘损坏等突发状况时，往往就无能为力仰天长叹了。而使用 mongodb 副本集可以较好地解决这些突发状况。

> MongoDB 中的副本集(Replica Set)是一组维护相同数据集的 mongod 服务，是 mongodb 集群的一种实现方式。

通俗点来讲就是提供数据的冗余备份，来达到容灾备份的效果。

#### 副本集三角色

- 主节点（Primary）：只有一个，负责处理客户端请求
- 从节点（Secondary）：N 个，负责复制主节点上的数据
- 仲裁节点（Arbiter）：一个，只负责选举投票，不存储数据

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgoreplica.png)

副本集具有自动故障转移的特点，当主节点发生异常（比如服务器宕机、数据硬盘损坏等）时，会自动选举一个从节点升为主节点。

::: tip 解释

主节点的选举受节点间心跳、优先级、最新的oplog时间等多种因素影响。可以查看官方文档了解详情。[文档](https://docs.mongodb.com/manual/replication/)

副本集数量最好设置为奇数，因为选举需满足大多数票数，如果是偶数可能出现最高票数相同的情况而选不出主节点，副本集在无法选出主节点的情况下会锁死写操作变为只读状态。

:::

接下来使用上图所示的 `1主节点`+`1从节点`+`1仲裁节点` 的方式来搭建副本集。

#### 副本集的搭建

> 服务器准备：192.1.1.1（Primary） 192.1.1.2（Secondary） 192.1.1.3（Arbiter）

::: tip 提示

以上三个为虚拟 `IP` ，搭建时替换为实际主机 `IP` 。

副本集也可搭建在一台服务器上，但是不安全，万一整台服务器没了就 gg 了。

:::

##### 安装 mongodb

> 具体安装步骤可查看前面大纲「安装」

三台主机上分别安装好 mongodb ，此时安装位置为 `/usr/local/mongodb4.2.8` 。

分别在三台主机上新建 mongodb 的 `data` 、`log` 、`conf` 目录，并且新建一个空的 `mongo.conf` 配置文件：

```sh
cd /usr/local/mongodb4.2.8/ &&
mkdir -p replica_sets &&
cd /usr/local/mongodb4.2.8/replica_sets &&
mkdir -p data log conf &&
cd /usr/local/mongodb4.2.8/replica_sets/conf &&
touch mongo.conf
```

目录结构为：

- `/usr/local/mongodb4.2.8`
  - `replica_sets` 
    - `data`
    - `log`
    - `conf`
      - `mongo.conf`

目录解释：

- `/usr/local/mongodb4.2.8` ：mongodb 安装目录
- `replica_sets` ：副本集所在目录
- `data` ：数据存储目录
- `log` ：日志存储目录
- `conf` ：配置文件所在目录
  - `mongo.conf` ：mongod 服务配置文件

接下来完善三台主机的 `mongo.conf` 配置文件，配置文件内容如下：

```yaml
systemLog:
  # MongoDB发送所有日志输出的目标指定为文件
  destination: file
  # 配置日志输出路径
  path: "/usr/local/mongodb4.2.8/replica_sets/log/mongod.log"
  # 当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾
  logAppend: true
storage:
  # 数据存储路径
  dbPath: "/usr/local/mongodb4.2.8/replica_sets/data"
  # 开启日志
  journal:
    #启用或禁用持久性日志以确保数据文件保持有效和可恢复。
    enabled: true
processManagement:
  # 执行时 fork 出一个新进程
  # 启用在后台运行mongos或mongod进程的守护进程模式
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/usr/local/mongodb4.2.8/replica_sets/log/mongod.pid"
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.168.1.1
  port: 27017
replication:
#  oplogSizeMB: 512
  # 副本集的名称
  replSetName: myrs
```

::: tip 提醒

和单机版相比，配置文件多了 `replication` 这个参数。注意副本集的 `replSetName` 必须一致，这里副本集的名称是 `myrs`。别忘了修改 `bindIp` 为主机的IP。

:::

##### 启动 mongod 服务

接下来，分别启动三台主机上的 `mongod` 服务：

```sh
mongod -f /usr/local/mongodb4.2.8/replica_sets/conf/mongo.conf 
```

##### 初始化副本集

上面三台主机上的 mongod 服务启动后还是脱离的状态，需要进行初始化来完成副本集的搭建。

登录规划的 Primary 节点（192.1.1.1）mongod 服务：

```sh
[root@cdhslave01 /]# mongo --port=27017
MongoDB shell version v4.2.8
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
...
...

> 
```

输入 `rs.initiate()` 命令初始化节点为主节点，看到 `"ok":1` 表示初始化成功：

```sh
> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "192.1.1.1:27017",
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595668049, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1595668049, 1)
}
```

接着按几下回车，可以看到命令行前面出现了 `PRIMARY` 字样，表示该节点已经是主节点啦。

```sh
myrs:PRIMARY>
```

可以使用 `rs.status()` 命令查看副本集状态：

```sh
myrs:PRIMARY> rs.status()
{
        "set" : "myrs",
        "date" : ISODate("2020-07-25T09:11:58.540Z"),
        "myState" : 1,
        "term" : NumberLong(1),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "majorityVoteCount" : 1,
        "writeMajorityCount" : 1,
        "optimes" : {
                "lastCommittedOpTime" : {
                        "ts" : Timestamp(1595668309, 1),
                        "t" : NumberLong(1)
                },
                "lastCommittedWallTime" : ISODate("2020-07-25T09:11:49.614Z"),
                "readConcernMajorityOpTime" : {
                        "ts" : Timestamp(1595668309, 1),
                        "t" : NumberLong(1)
                },
                "readConcernMajorityWallTime" : ISODate("2020-07-25T09:11:49.614Z"),
                "appliedOpTime" : {
                        "ts" : Timestamp(1595668309, 1),
                        "t" : NumberLong(1)
                },
                "durableOpTime" : {
                        "ts" : Timestamp(1595668309, 1),
                        "t" : NumberLong(1)
                },
                "lastAppliedWallTime" : ISODate("2020-07-25T09:11:49.614Z"),
                "lastDurableWallTime" : ISODate("2020-07-25T09:11:49.614Z")
        },
        "lastStableRecoveryTimestamp" : Timestamp(1595668289, 1),
        "lastStableCheckpointTimestamp" : Timestamp(1595668289, 1),
        "electionCandidateMetrics" : {
                "lastElectionReason" : "electionTimeout",
                "lastElectionDate" : ISODate("2020-07-25T09:07:29.468Z"),
                "electionTerm" : NumberLong(1),
                "lastCommittedOpTimeAtElection" : {
                        "ts" : Timestamp(0, 0),
                        "t" : NumberLong(-1)
                },
                "lastSeenOpTimeAtElection" : {
                        "ts" : Timestamp(1595668049, 1),
                        "t" : NumberLong(-1)
                },
                "numVotesNeeded" : 1,
                "priorityAtElection" : 1,
                "electionTimeoutMillis" : NumberLong(10000),
                "newTermStartDate" : ISODate("2020-07-25T09:07:29.601Z"),
                "wMajorityWriteAvailabilityDate" : ISODate("2020-07-25T09:07:29.717Z")
        },
        "members" : [
                {
                        "_id" : 0,
                        "name" : "192.168.8.226:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 749,
                        "optime" : {
                                "ts" : Timestamp(1595668309, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:11:49Z"),
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1595668049, 2),
                        "electionDate" : ISODate("2020-07-25T09:07:29Z"),
                        "configVersion" : 1,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                }
        ],
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595668309, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1595668309, 1)
}
myrs:PRIMARY> 
```

可以查看副本集的一些信息，其中 `members` 可以查看副本集成员：

```sh
"members" : [
                {
                        "_id" : 0,
                        "name" : "192.168.8.226:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 749,
                        "optime" : {
                                "ts" : Timestamp(1595668309, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:11:49Z"),
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1595668049, 2),
                        "electionDate" : ISODate("2020-07-25T09:07:29Z"),
                        "configVersion" : 1,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                }
        ],
```

可以看到，目前只有一个主节点（`"stateStr" : "PRIMARY"`）

接着添加从节点（Secondary），提示 `"ok":1` 表示添加成功 :

```sh
myrs:PRIMARY> rs.add("192.1.1.2:27017")
{
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595668642, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1595668642, 1)
}
```

`rs.status()` 查看副本集状态，可以看到 `members` 多了从节点成员：

```sh
"members" : [
                {
                        "_id" : 0,
                        "name" : "192.168.8.226:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 1180,
                        "optime" : {
                                "ts" : Timestamp(1595668739, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:18:59Z"),
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1595668049, 2),
                        "electionDate" : ISODate("2020-07-25T09:07:29Z"),
                        "configVersion" : 2,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                },
                {
                        "_id" : 1,
                        "name" : "192.168.8.234:27017",
                        "health" : 1,
                        "state" : 2,
                        "stateStr" : "SECONDARY",
                        "uptime" : 106,
                        "optime" : {
                                "ts" : Timestamp(1595668739, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDurable" : {
                                "ts" : Timestamp(1595668739, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:18:59Z"),
                        "optimeDurableDate" : ISODate("2020-07-25T09:18:59Z"),
                        "lastHeartbeat" : ISODate("2020-07-25T09:19:08.886Z"),
                        "lastHeartbeatRecv" : ISODate("2020-07-25T09:19:08.893Z"),
                        "pingMs" : NumberLong(1),
                        "lastHeartbeatMessage" : "",
                        "syncingTo" : "192.168.8.226:27017",
                        "syncSourceHost" : "192.168.8.226:27017",
                        "syncSourceId" : 0,
                        "infoMessage" : "",
                        "configVersion" : 2
                }
        ],
```

登录 192.1.1.2 上的 `mongod` 服务，可以看到命令前面 `Secondary` 字样，表示该节点为从节点：

```sh
myrs:SECONDARY>
```

接着添加仲裁节点（Arbiter），提示 `"ok":1` 表示添加成功 :

```sh
myrs:PRIMARY> rs.addArb("192.1.1.3:27017")
{
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595668970, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1595668970, 1)
}
```

`rs.status()` 查看副本集状态，可以看到 `members` 又多了仲裁节点成员：

```sh
"members" : [
                {
                        "_id" : 0,
                        "name" : "192.168.8.226:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 1466,
                        "optime" : {
                                "ts" : Timestamp(1595669029, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:23:49Z"),
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1595668049, 2),
                        "electionDate" : ISODate("2020-07-25T09:07:29Z"),
                        "configVersion" : 3,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                },
                {
                        "_id" : 1,
                        "name" : "192.168.8.234:27017",
                        "health" : 1,
                        "state" : 2,
                        "stateStr" : "SECONDARY",
                        "uptime" : 393,
                        "optime" : {
                                "ts" : Timestamp(1595669029, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDurable" : {
                                "ts" : Timestamp(1595669029, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2020-07-25T09:23:49Z"),
                        "optimeDurableDate" : ISODate("2020-07-25T09:23:49Z"),
                        "lastHeartbeat" : ISODate("2020-07-25T09:23:54.707Z"),
                        "lastHeartbeatRecv" : ISODate("2020-07-25T09:23:54.710Z"),
                        "pingMs" : NumberLong(0),
                        "lastHeartbeatMessage" : "",
                        "syncingTo" : "192.168.8.226:27017",
                        "syncSourceHost" : "192.168.8.226:27017",
                        "syncSourceId" : 0,
                        "infoMessage" : "",
                        "configVersion" : 3
                },
                {
                        "_id" : 2,
                        "name" : "192.168.8.250:27017",
                        "health" : 1,
                        "state" : 7,
                        "stateStr" : "ARBITER",
                        "uptime" : 65,
                        "lastHeartbeat" : ISODate("2020-07-25T09:23:54.708Z"),
                        "lastHeartbeatRecv" : ISODate("2020-07-25T09:23:54.917Z"),
                        "pingMs" : NumberLong(0),
                        "lastHeartbeatMessage" : "",
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "configVersion" : 3
                }
        ],
```

至此，副本集搭建就完成了，接下来测试副本集的读写操作。

##### 数据读写操作

登录主节点，新建数据库 `mydb` ，在 `mydb` 中新建集合 `person` 并插入文档数据：

```sh
myrs:PRIMARY> use mydb
switched to db mydb
myrs:PRIMARY> db.person.insert({name:"wxl",age:27})
WriteResult({ "nInserted" : 1 })
```

写入成功提示 `WriteResult...` ，接着查看插入的数据，也没问题：

```sh
myrs:PRIMARY> db.person.find().pretty()
{ "_id" : ObjectId("5f1bfb43fe34cd1b886ecdda"), "name" : "wxl", "age" : 27 }
```

然后登录从节点（Secondary），查看插入的数据：

```sh
myrs:SECONDARY>show dbs
2020-07-25T17:31:42.534+0800 E  QUERY    [js] uncaught exception: Error: listDatabases failed:{
        "operationTime" : Timestamp(1595669499, 1),
        "ok" : 0,
        "errmsg" : "not master and slaveOk=false",
        "code" : 13435,
        "codeName" : "NotMasterNoSlaveOk",
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595669499, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
Mongo.prototype.getDBs/<@src/mongo/shell/mongo.js:135:19
Mongo.prototype.getDBs@src/mongo/shell/mongo.js:87:12
shellHelper.show@src/mongo/shell/utils.js:906:13
shellHelper@src/mongo/shell/utils.js:790:15
@(shellhelp2):1:1
```

发现报错了，查看不了数据，因为从节点只是作为主节点的数据备份节点，还没有读数据的权限，需要设置读权限，使用命令 `rs.slaveOk()`：

```sh
myrs:SECONDARY> rs.slaveOk()
myrs:SECONDARY> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
myrs:SECONDARY> use mydb
switched to db mydb
myrs:SECONDARY> db.person.find().pretty()
{ "_id" : ObjectId("5f1bfb43fe34cd1b886ecdda"), "name" : "wxl", "age" : 27 }
```

可以看到，已经查看到了在主节点插入的数据。

接着测试一下在从节点插入数据：

```sh
myrs:SECONDARY> db.person.insert({name:"www",age:22})
WriteCommandError({
        "operationTime" : Timestamp(1595669849, 1),
        "ok" : 0,
        "errmsg" : "not master",
        "code" : 10107,
        "codeName" : "NotMaster",
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595669849, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
})
myrs:SECONDARY> 
```

发现报错了，提示 `not master` ，因为**副本集只有主节点有写数据的权限**。

然后，登录仲裁节点（Arbiter）来查看一下数据，同样的，需要先设置 `rs.slaveOk()` :

```sh
myrs:ARBITER> rs.slaveOk()
```

接着，使用 `show dbs` 命令：

```sh
myrs:ARBITER> show dbs
local  0.000GB
```

可以看到只有 `local` 库了，因为仲裁节点不存储数据，只负责投票，典型的工具人:D。

##### 故障测试

说了这么多，感觉副本集比较牛x的样子，是骡子是马拉出来溜溜，看下究竟有没有这么🐂🍺：

下面模拟故障，杀掉主节点的 `mongod` 服务。连接主节点 `mongod` 服务，使用 `admin` 数据库调用 `db.shutdownServer()` 命令关闭服务：

```sh
myrs:PRIMARY> use mydb
switched to db admin
myrs:PRIMARY> db.shutdownServer()
2020-07-25T17:47:26.079+0800 I  NETWORK  [js] DBClientConnection failed to receive message from 127.0.0.1:27017 - HostUnreachable: Connection closed by peer
server should be down...
2020-07-25T17:47:26.081+0800 I  NETWORK  [js] trying reconnect to 127.0.0.1:27017 failed
2020-07-25T17:47:26.081+0800 I  NETWORK  [js] reconnect 127.0.0.1:27017 failed failed 
> 
```

接着登录 192.1.1.2 上的从节点（Secondary）`mongod` 服务，发现已经由原来的 `SECONDARY` 变为 `PRIMARY` 啦！现在 192.1.1.2 主机的 `mongod` 服务就是主节点啦。当然，仲裁节点依然是仲裁节点，谁叫它是工具人呢🤪。　

::: 提示

想要恢复之前规划的主节点、从节点、仲裁节点，需要重新启动一下副本集

:::

##### 安全认证

前面搭建的副本集是没有安全认证的，如果知道了主节点的连接信息是很危险的，接下里加上副本集的安全认证。

连接主节点，分别创建 `root` 、`system` 、`test` 三个用户：

> root：超级管理员
>
> system：负责创建用户和分配权限
>
> test：普通用户，读写指定数据库数据

```sh
myrs:PRIMARY> db.createUser({user:"root",pwd:"root",roles:[{role:"root",db:"admin"}]})
...
myrs:PRIMARY> db.createUser({user:"system",pwd:"system",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
...
myrs:PRIMARY> db.createUser({user:"test",pwd:"123456",roles:[{role:"readWrite",db:"mydb"}]}))
...
```

**创建完用户后，分别关闭三台主机上的 `mongod` 服务。**

::: tip 注意

需要注意的是，副本集的安全认证比单机版的多了一项 `keyFile` 配置。因为副本集各节点之间通信是以 `keyFile` 作为令牌来保障数据的安全的。各个节点必须使用同一份 `keyFile` 文件。

:::

可以用 `openssl` 命令来生成 keyfile 文件，位于主节点所在主机 `/usr/local/mongodb4.2.8/replica_sets/conf` 目录下：

```sh
[root@cdhslave01 conf]# openssl rand -base64 90 -out ./mongo.keyfile
[root@cdhslave01 conf]# chmod 400 ./mongo.keyfile
[root@cdhslave01 conf]# ll mongo.keyfile
-r--------. 1 root root 122 Jul 25 18:30 mongo.keyfile
```

::: tip 注意

需要授予 `keyfile` 400 只读的权限，否则后面会报错:`permissions on ...mongo.keyfile are too open`

:::

然后拷贝该 `mongo.keyfile` 文件到其他两个主机上（远程拷贝命令可查看大纲一「安装」里的描述）：

```sh
[root@cdhslave01 conf]# scp mongo.keyfile root@192.1.1.2:/usr/local/mongodb4.2.8/replica_sets/conf
...
[root@cdhslave01 conf]# scp mongo.keyfile root@192.1.1.3:/usr/local/mongodb4.2.8/replica_sets/conf
...
```

好了，现在三台主机上都有了 `mongo.keyfile` 文件，接下来分别修改三台主机上的 `mongo.conf` 配置文件，文件末尾加上如下内容：

```yaml
security:
  # keyFile鉴权文件
  keyFile: /usr/local/mongodb4.2.8/replica_sets/conf/mongo.keyfile
  # 开启认证
  authorization: enabled
```

修改完成后，再次启动三台主机上的 `mongod` 服务，登录主节点：

```sh
myrs:PRIMARY> show dbs
myrs:PRIMARY>
```

使用 `show dbs` 命令发现为空，因为副本集已经添加了认证，需要认证才能访问数据：

```sh
myrs:PRIMARY>db.auth("root","root")
myrs:PRIMARY>show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
```

使用 `root` 认证，可以看到所有数据库信息，如果使用 `test` 用户认证，则只能看到 `mydb` 库，因为前面只给 `test` `mydb`库的权限：

```sh
myrs:PRIMARY>db.auth("test","123456")
myrs:PRIMARY>show dbs
mydb    0.000GB
```

同样，在从节点（Secondary）中也需要认证。

### 3.分片集群(Sharded Cluster)

前面介绍了使用副本集的方式搭建 mongo 集群，已经可以做到自动故障转移和容灾备份了，但是随着业务规模的不断发展， mongo 服务压力会逐渐增加，比如单路由模式负载会增加，单集合数据量到海量级后读写效率下降等。为了解决这些问题，一般使用分片(Sharding) 的方式搭建 mongo 集群。

::: tip 说明

分片集群中也使用了副本集。

分片适合业务量较大的场合，如果项目业务量较小，可以只使用副本集的方式。

:::

#### 分片集群架构及角色

![](https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgo123.png)

- 数据分片（Shards）：用来保存数据。每个分片都是一个副本集
- 查询路由（Query Routers）：用来将客户端读写请求路由到分片（Shard）上。一个分片集群包含一个或多个 `mongos` 实例，客户端直接连接路由服务即可。
- 配置服务器（Config servers）：保存集群的元数据（metadata），包含各个 Shard 的路由规则。配置服务也是一个副本集。

#### 集群搭建

::: tip 说明

下面来搭建分片集群，包括3个分片副本集（3x3=9 `mongod` 实例 ），1个配置服务副本集（1X3=3 `mongod` 实例），3个路由服务（3 `mongos` 实例），总共12个 `mongod` 实例，3个 `mongos` 实例

:::

主机 `mongo` 服务分配如下：

| 192.1.1.1              | 192.1.1.2              | 192.1.1.3              |
| ---------------------- | ---------------------- | ---------------------- |
| mongos                 | mongos                 | mongos                 |
| config server 主节点   | config server 从节点   | config server 从节点   |
| shard server1 主节点   | shard server1 从节点   | shard server1 仲裁节点 |
| shard server2 仲裁节点 | shard server2 主节点   | shard server2 从节点   |
| shard server3 从节点   | shard server1 仲裁节点 | shard server3 主节点   |

::: tip 提示

以上三个为虚拟 `IP` ，搭建时替换为实际主机 `IP` 。

三台主机分别启动3个 `mongos` 路由服务，路由服务不需要设置为副本集。

配置服务为一个副本集，包含一个主节点（Primary）和两个从节点（Secondary），配置服务不能设置仲裁节点（Arbiter）。

三个分片服务副本集，各节点在三台主机上交叉分布。

:::

端口分配：

```yaml
mongos: 27117
config: 27118
shard1: 27119
shard2: 27219
shard3: 27319
```

##### 安装 mongodb 及数据目录准备

三台主机分别安装好 `mongodb` ，方法参考大纲一「安装」，此时安装位置为 `/usr/local/mongodb4.2.8` 。

在每台主机上新建 `mongos`、`config` 、`shard1`、`shard2`、`sahrd3` 五个目录：

```sh
cd /usr/local/mongodb4.2.8/ &&
mkdir -p sharded_cluster &&
cd /usr/local/mongodb4.2.8/sharded_cluster &&
mkdir -p mongos config shard1 shard2 shard3
```

目录结构为：

- `/usr/local/mongodb4.2.8`
  - `sharded_cluster` 
    - `mongos`
    - `config`
    - `shard1`
    - `shard2`
    - `shard3`

目录解释：

- `sharded_cluster` ：分片集群所在目录
- `mongos` ：路由服务目录
- `config` ：配置服务目录
- `shard1` ：分片1服务目录
- `shard2` ：分片2服务目录
- `shard3` ：分片3服务目录

然后分别在新建的五个目录中建立 `data`、`log`、`conf` 目录，用来存储数据、日志和配置文件：

::: tip 提示

路由服务不存储数据，只需建立 `log` 、`conf` 目录即可

:::

```sh
cd /usr/local/mongodb4.2.8/sharded_cluster &&
mkdir -p mongos/data mongos/log &&
mkdir -p config/data config/log config/conf &&
mkdir -p shard1/data shard1/log shard1/conf &&
mkdir -p shard2/data shard2/log shard2/conf &&
mkdir -p shard3/data shard3/log shard3/conf
```

接着分别在 `conf` 目录下新建 `mongodb` 的配置文件：

```sh
cd /usr/local/mongodb4.2.8/sharded_cluster &&
touch mongos/conf/mongos.conf &&
touch config/conf/config.conf &&
touch shard1/conf/shard1.conf &&
touch shard2/conf/shard2.conf &&
touch shard3/conf/shard3.conf
```

各配置文件信息如下：

分片服务配置`shard1.conf` ：

```yaml
systemLog:
  # MongoDB发送所有日志输出的目标指定为文件
  destination: file
  # 配置日志输出路径
  path: "/usr/local/mongodb4.2.8/sharded_cluster/shard1/log/mongod.log"
  # 当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾
  logAppend: true
storage:
  # 数据存储路径
  dbPath: "/usr/local/mongodb4.2.8/sharded_cluster/shard1/data"
  # 开启日志
  journal:
    #启用或禁用持久性日志以确保数据文件保持有效和可恢复。
    enabled: true
processManagement:
  # 执行时 fork 出一个新进程
  # 启用在后台运行mongos或mongod进程的守护进程模式
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/usr/local/mongodb4.2.8/sharded_cluster/shard1/log/mongod.pid"
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.1.1.1
  port: 27119
replication:
#  oplogSizeMB: 512
  # 副本集的名称
  replSetName: shardrs01
sharding:
	# 集群角色为分片服务
  clusterRole: shardsvr
#security:
  # keyFile鉴权文件
  #keyFile: /usr/local/mongodb/shard1/mongo.keyfile
  # 开启认证
  #authorization: enabled
```

::: tip 说明

`replication.replSetName` 、`sharding.clusterRole` 参数分别表示 shard1 分片副本集名称和集群角色

:::

`shard2.conf`、`shard3.conf` 和 `shard1.conf` 一致，注意修改路径、端口和副本集名称 `replSetName` 。

`shard2`：

```yaml
port: 27219
replSetName: shardrs02
```

`shard3` ：

```yaml
port: 27319
replSetName: shardrs03
```

配置服务配置 `config.conf` ：

```yaml
systemLog:
  # MongoDB发送所有日志输出的目标指定为文件
  destination: file
  # 配置日志输出路径
  path: "/usr/local/mongodb4.2.8/sharded_cluster/config/log/mongod.log"
  # 当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾
  logAppend: true
storage:
  # 数据存储路径
  dbPath: "/usr/local/mongodb4.2.8/sharded_cluster/config/data"
  # 开启日志
  journal:
    #启用或禁用持久性日志以确保数据文件保持有效和可恢复。
    enabled: true
processManagement:
  # 执行时 fork 出一个新进程
  # 启用在后台运行mongos或mongod进程的守护进程模式
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/usr/local/mongodb4.2.8/sharded_cluster/config/log/mongod.pid"
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.1.1.1
  port: 27118
replication:
#  oplogSizeMB: 512
  # 副本集的名称
  replSetName: configrs
sharding:
	# 集群角色为配置服务
  clusterRole: configsvr
```

路由服务配置 `mongos.conf` ：

```yaml
systemLog:
  # MongoDB发送所有日志输出的目标指定为文件
  destination: file
  # 配置日志输出路径
  path: "/usr/local/mongodb4.2.8/sharded_cluster/mongos/log/mongod.log"
  # 当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾
  logAppend: true
processManagement:
  # 执行时 fork 出一个新进程
  # 启用在后台运行mongos或mongod进程的守护进程模式
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/usr/local/mongodb4.2.8/sharded_cluster/mongos/log/mongod.pid"
net:
  # 服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
#  bindIpAll: true
  # 设定对外暴露的 IP 和 端口
  bindIp: localhost,192.1.1.1
  port: 27117
sharding:
	# 设置配置服务
  configDB: configrs/192.1.1.1:27118,192.1.1.2:27118,192.1.1.3:27118
```

::: tip 提示

路由服务不存储数据，也不是副本集，所以没有 `storage` 和 `replication`这两项。

`sharding` 不再是设置集群角色，需关联配置服务 `configDB` ：

`configrs` 为配置服务副本集的名称，后面为配置服务副本集各节点 `url` 。

:::

::: warning 提醒

完成一台主机的上述配置文件后，把它们拷贝到其他两台主机上，记得修改配置文件的 `bindIp` 为主机 `ip` 。

:::

##### 启动配置服务并初始化

分别启动三台主机上的配置服务（Config Server）:

```sh
mongod -f /usr/local/mongodb4.2.8/sharded_cluster/config/conf/config.conf
```

登录规划的配置服务主节点（192.1.1.1）：

```sh
[root@cdhslave01 /]# mongo --port=27118
MongoDB shell version v4.2.8
...
...
> 
```

初始化配置服务副本集，添加从节点：

```sh
> rs.initiate()
...
configrs:PRIMARY> rs.add("192.1.1.2:27118")
...
configrs:PRIMARY> rs.add("192.1.1.3:27118")
```

使用 `rs.status()` 可查看副本集状态。

##### 启动分片服务并初始化

###### 启动分片一（Shard1）并初始化：

```sh
mongod -f /usr/local/mongodb4.2.8/sharded_cluster/shard1/conf/shard1.conf
```

登录规划的配置服务主节点（192.1.1.1）：

```sh
[root@cdhslave01 /]# mongo --port=27119
MongoDB shell version v4.2.8
...
...
> 
```

初始化配置服务副本集，添加从节点：

```sh
> rs.initiate()
...
configrs:PRIMARY> rs.add("192.1.1.2:27119")
...
configrs:PRIMARY> rs.add("192.1.1.3:27119")
```

使用 `rs.status()` 可查看副本集状态。

###### 启动分片二（Shard2）并初始化：

```sh
mongod -f /usr/local/mongodb4.2.8/sharded_cluster/shard2/conf/shard2.conf
```

登录规划的配置服务主节点（192.1.1.2）：

```sh
[root@cdhslave01 /]# mongo --port=27219
MongoDB shell version v4.2.8
...
...
> 
```

初始化配置服务副本集，添加从节点：

```sh
> rs.initiate()
...
configrs:PRIMARY> rs.add("192.1.1.3:27219")
...
configrs:PRIMARY> rs.add("192.1.1.1:27219")
```

使用 `rs.status()` 可查看副本集状态。

###### 启动分片三（Shard3）并初始化：

```sh
mongod -f /usr/local/mongodb4.2.8/sharded_cluster/shard3/conf/shard3.conf
```

登录规划的配置服务主节点（192.1.1.3）：

```sh
[root@cdhslave01 /]# mongo --port=27319
MongoDB shell version v4.2.8
...
...
> 
```

初始化配置服务副本集，添加从节点：

```sh
> rs.initiate()
...
configrs:PRIMARY> rs.add("192.1.1.3:27319")
...
configrs:PRIMARY> rs.add("192.1.1.1:27319")
```

使用 `rs.status()` 可查看副本集状态。

##### 启动路由服务并初始化

启动三台服务器的mongos server：

::: tip 注意

路由服务是 `mongos` 服务，不是 `mongod` 服务，需要使用 `mongos` 命令启动

:::

```sh
mongos -f /usr/local/mongodb4.2.8/sharded_cluster/mongos/conf/mongos.conf
```

登录任意一台主机，连接路由服务，可以看到 `mongos` 字样：

```sh
[root@cdhslave01 /]# mongo --port=27117
MongoDB shell version v4.2.8
...
mongos> 
```

添加分片，分别添加三个分片服务副本集：

```sh
mongos> use admin
switched to db admin
mongos> sh.addShard("shardrs01/192.1.1.1:27119,192.1.1.2:27119,192.1.1.3:27119")
{
        "shardAdded" : "shardrs01",
        "ok" : 1,
        "operationTime" : Timestamp(1595847545, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595847545, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
mongos> sh.addShard("shardrs02/192.1.1.1:27219,192.1.1.2:27219,192.1.1.3:27219")

{
        "shardAdded" : "shardrs02",
        "ok" : 1,
        "operationTime" : Timestamp(1595847577, 2),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595847577, 2),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
mongos> sh.addShard("shardrs03/192.1.1.1:27319,192.1.1.2:27319,192.1.1.3:27319")

{
        "shardAdded" : "shardrs03",
        "ok" : 1,
        "operationTime" : Timestamp(1595847603, 2),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595847603, 2),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
```

使用 `sh.status()` 查看路由服务状态：

```sh
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
        "_id" : 1,
        "minCompatibleVersion" : 5,
        "currentVersion" : 6,
        "clusterId" : ObjectId("5f1ea834619d06342fffd76c")
  }
  shards:
        {  "_id" : "shardrs01",  "host" : "shardrs01/192.1.1.1:27119,192.1.1.2:27119",  "state" : 1 }
        {  "_id" : "shardrs02",  "host" : "shardrs02/192.1.1.2:27219,192.1.1.3:27219",  "state" : 1 }
        {  "_id" : "shardrs03",  "host" : "shardrs03/192.1.1.1:27319,192.1.1.2:27319",  "state" : 1 }
  active mongoses:
        "4.2.8" : 3
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
```

可以看到 `shards` 包含了三个分片服务副本集（不显示仲裁节点）。

::: tip 提示

只需要在一台主机的路由服务中配置分片即可，其他路由服务会自动同步分片配置

:::

##### 启用集合分片生效

目前路由服务、配置服务、分片服务都已经串联起来了，但是想要数据自动分片，还需要启用集合分片。

登录任意一台主机的路由服务（mongos server）:

```sh
mongo --port=27117
```

使用 `admin` 数据库：

```sh
mongos> use admin
switched to db admin
```

指定 `testdb`（业务库）分片生效：

```sh
mongos> sh.enablesharding("testdb")
{
        "ok" : 1,
        "operationTime" : Timestamp(1595849172, 5),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595849172, 5),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
```

指定需要分片的集合（Collection）和片键（Shard Key）：

> 片键：选择文档中某个字段作为分片的依据，片键所在字段必须为必填字段。
>
> 分片策略有`哈希策略` 和 `范围策略`，如无特殊情况，一般使用哈希策略，将文档中 `_id` 字段作为片键。详情可查看官方[文档](https://docs.mongodb.com/manual/replication/)

```sh
mongos> sh.shardCollection("testdb.test",{"_id":"hashed"})
{
        "collectionsharded" : "testdb.test",
        "collectionUUID" : UUID("2664a718-9213-46d1-9db2-bffbdbb6e83b"),
        "ok" : 1,
        "operationTime" : Timestamp(1595850047, 21),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1595850047, 21),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
```

上述命令表示将 `testdb` 库中的 `test` 集合按照 `_id` 哈希值进行分片。

使用 `sh.status()` 命令可以看到具体的分片情况。

##### 测试自动分片

目前分片集群已经搭建完毕，下面来测试下是否会自动分片。

登录任意一台路由服务：

```sh
mongo --port=27117
```

切换到 `testdb` 数据库：

```sh
mongos> use testdb
switched to db testdb
```

插入测试数据，总共 100000 条：

```sh
for(i=1;i<=100000;i++){db.table1.insert({"number":i})};
```

::: tip 提示

一次插入数据量过大可能会比较慢，控制台会卡住，需要等一下。服务器配置很哇塞的可以忽略此条提示🤓

:::

插入完成后，查看各分片的数据情况：

```sh
mongos> db.test.stats()
...
shards:{
	"shardrs01":{
		"ns":"testdb.test",
		"count":33197
		...
	},
	"shardrs02":{
		"ns":"testdb.test",
		"count":33269
		...
	},
	"shardrs03":{
		"ns":"testdb.test",
		"count":33534
		...
	}
}
...
```

可以看到，基本均匀分布在各个分片，自动分片成功啦。

#### 安全认证

上面演示的分片集群没有安全认证，如果知道路由节点连接信息显然是比较危险的，下面来为分片集群添加安全认证。

分片集群环境下的安全认证和副本集环境下基本一样。

##### 关闭集群服务

首先，关掉三台主机上之前启动的 `mongo` 集群服务（12个 `mongod` 服务和3个 `mongos` 服务）

::: tip 建议

建议依次关闭分片服务、配置服务、路由服务

分片服务建议依次关闭仲裁节点、从节点、主节点

配置服务建议依次关闭从节点、主节点

:::

```sh
[root@cdhslave01 /]# ps -ef|grep mongo
root     13768     1  1 18:08 ?        00:02:44 mongod -f /usr/local/mongodb4.2.8/sharded_cl
uster/config/conf/config.conf
root     16867     1  2 18:28 ?        00:02:28 mongod -f /usr/local/mongodb4.2.8/sharded_cl
uster/shard1/conf/shard1.conf
root     17799     1  0 18:35 ?        00:00:44 mongod -f /usr/local/mongodb4.2.8/sharded_cl
uster/shard2/conf/shard2.conf
root     19598     1  2 18:49 ?        00:01:58 mongod -f /usr/local/mongodb4.2.8/sharded_cl
uster/shard3/conf/shard3.conf
root     20468     1  1 18:55 ?        00:01:39 mongos -f /usr/local/mongodb4.2.8/sharded_cl
uster/mongos/conf/mongos.conf
root     21903     1  0 Jul25 ?        00:29:21 mongod -f /usr/local/mongodb4.2.8/replica_se
ts/conf/mongo.conf
root     32401 32334  0 20:27 pts/0    00:00:00 grep --color=auto mongo
```

杀掉分片集群相关的 `mongo` 服务：

```sh
[root@cdhslave01 /]# kill -2 13768 16867 17799 19598 20468
```

##### 生成 mongo.keyfile 文件

和副本集认证方式一样，分片集群也需要 `keyFile` 鉴权认证，现在任意一台主机上生成 `mongo.keyfile` 文件，然后拷贝到其他地方。

::: tip  提示

这里分片集群总共有15个 `mongo` 服务实例，使用同一个 keyfile 文件。

:::

登录任意一台主机，生成一个 `mongo.keyfile` 文件（这里在主机 192.1.1.1 的 `/usr/local/mongodb4.2.8/sharded_cluster/keyfile`目录下生成）：

```sh
[root@cdhslave01 /]# cd /usr/local/mongodb4.2.8/sharded_cluster/
[root@cdhslave01 sharded_cluster]# mkdir -p keyfile
[root@cdhslave01 sharded_cluster]# cd keyfile
[root@cdhslave01 keyfile]# openssl rand -base64 90 -out ./mongo.keyfile
[root@cdhslave01 keyfile]# chmod 400 ./mongo.keyfile
[root@cdhslave01 keyfile]# ll mongo.keyfile
-r--------. 1 root root 122 Jul 27 20:45 mongo.keyfile
```

::: tip 提醒

每台主机上存储一个 `mongo.keyfile` 文件，集群各服务指向该 `kefile` 文件

需要授予 `keyfile` 400 只读的权限，否则后面会报错:`permissions on ...mongo.keyfile are too open`

:::

拷贝 `mongo.keyfile` 文件到其他两台主机的相同目录。

##### 修改 mongo 服务配置文件

修改各个服务的配置文件（总共15个），添加安全认证：

`mongod` 服务：

```yaml
security:
  # keyFile鉴权文件
  keyFile: /usr/local/mongodb4.2.8/sharded_cluster/keyfile/mongo.keyfile
  # 开启认证
  authorization: enabled
```

`mongos` 服务：

```yaml
security:
  # keyFile鉴权文件
  keyFile: /usr/local/mongodb4.2.8/sharded_cluster/keyfile/mongo.keyfile
```

::: tip 注意

`mongos` 服务没有 `authorization` ，因为mongos只做路由，不保存数据，不需要数据访问的权限。

:::

##### 重启集群服务

修改完配置文件后，重新启动分片集群，建议按照配置服务、分片服务、路由服务的顺序启动。

::: warning 提醒

重启如果遇到 `about to fork child process, waiting until server is ready for connections` 报错，一般是用 `kill` 命令没杀干净进程导致的，检查 mongo 服务进程是否杀干净。为了避免这种情况发生，结束 `mongo` 服务建议用 `db.shutdownServer()` 

:::

##### 创建用户

重新启动集群后，登录任意一台主机路由服务（mongos server）：

```sh
[root@cdhslave01 /]# mongo --port=27117
MongoDB shell version v4.2.8
connecting to: mongodb://127.0.0.1:27117/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f8b3bf25-1439-419b-94a1-dce0944ead02") }
MongoDB server version: 4.2.8
mongos> 
```

使用 `show dbs` 命令发现为空，证明安全认证已经生效。切换到 `admin` 库创建 `root` 账号：

```sh
mongos> use admin
switched to db admin
mongos> db.createUser({user:"root",pwd:"root",roles:["root"])
Successfully added user: {
        "user" : "root",
        "roles" : [
                {
                        "role" : "root"
                        "db" : "admin"
                }
        ]
}
```

::: tip 提示

初始创建用户时不需要认证（相当于 mongo 提供的后门）。

用户密码建议设置不要这么简单，这里只是演示用。

:::

接着创建系统用户管理员用户，该用户可以管理所有库的用户权限，需要先认证，认证成功显示 `1`：

```sh
mongos> db.auth("root","root")
1
mongos> db.createUser({user:"system",pwd:"system",roles:["userAdminAnyDatabase"])
Successfully added user: {
        "user" : "system",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase"
                        "db" : "admin"
                }
        ]
}
```

认证成功后使用 `show dbs` 就可以看到数据库信息了：

```sh
mongos> show dbs
admin      0.000GB
config     0.003GB
testdb     0.006GB
```

接下来创建业务库相关的用户，切换到业务库 `testdb`，分别创建业务库用户管理员和普通用户：

```sh
mongos> use testdb
switched to db testdb
mongos> db.createUser({user:"userAdmin",pwd:"123456",roles:[{role:"userAdmin",db:"testdb"}])
Successfully added user: {
        "user" : "userAdmin",
        "roles" : [
                {
                        "role" : "userAdmin"
                        "db" : "testdb"
                }
        ]
}
mongos> db.createUser({user:"user",pwd:"123456",roles:[{role:"readWrite",db:"testdb"}])
Successfully added user: {
        "user" : "user",
        "roles" : [
                {
                        "role" : "readWrite"
                        "db" : "testdb"
                }
        ]
}
```

切换到 `admin` 库，使用 `db.system.users.find().pretty()` 可以查看

创建的用户信息。

::: tip 解释

在分片群集中，客户端通常直接向 `mongos` 实例进行身份验证。我们通过 `mongos` 创建的用户数据，`mongodb` 会把它存储在配置服务（`config servers`）的 `admin` 库中。

某些情况下，可能需要直接连接特定分片（`sharding`）服务进行维护操作，页可以为分片服务单独创建用户。

:::

至此，分片集群已经搭建完毕啦。 
