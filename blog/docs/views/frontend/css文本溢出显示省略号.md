---
sidebar: auto
title: css文本溢出显示省略号
date: 2019-8-10
categories:
 - 前端
tags:
 - DIV
 - CSS
---

<Copyright link="https://imxiaolong.com/views/frontend/css文本溢出显示省略号.html" />

有时候我们只想让一段文字显示一行或者几行，其他多余的部分用省略号显示，该怎么做呢？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css3处理文本溢出显示省略号...问题</title>
</head>
<style type="text/css">
    .box{
        width: 200px;
        height: 200px;
        margin:50px auto;
        border: 1px solid black;
    }
</style>
<body>
    <div class="box">
        <p class="text1">风萧萧，蝶恋空，无边落木怨苍穹，成败得失多少愁，挥袖一笑中;雨蒙蒙，追星梦，三更磨剑唤天虹，数载拼搏复相逢，举杯话英雄。</p>
    </div>
</body>
</html>
```

比如上面这个html,我们定义一个父容器div(class='box')，设置一下它的宽高和一些边距。在容器里面定义一个段落p,页面显示效果如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14nmhhmoej20b307pglo.jpg)

可以看到，上面p段落中的内容默认是全部显示出来的，假如只需要显示一行，多余的部分用省略号...来代替，该怎么弄呢？

我们只需要给文字所在容器（这里是p标签）加上以下样式就OK了。

```css
    .text1{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
```

overflow:hidden,溢出部分隐藏

text-overflow:ellipsis,溢出后显示什么？这里显示省略号

white-space:nowrap,段落中的文本不进行换行

加上以上样式后显示效果如下，可以看到多余部分已经隐藏起来啦!

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14nn7x00zj20ba07ugli.jpg)

下面还有另一种处理方式，用以下样式：

```css
    .text1{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient: vertical;
    }
```

对比上一种方式，前面两个属性不变，后面三个属性用到webkit内核渲染。

display: -webkit-box,弹性盒子设置
-webkit-line-clamp:1，块元素中显示文本行数
-webkit-box-orient: vertical，子元素应该被水平或垂直排列

效果如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14nnvyz4zj20ba07ugli.jpg)

可以看到，效果和之前的方法完全一样，但是它的第4个属性-webkit-line-clamp的值可以设置，这里是1，效果只显示一行，也可以设置为其他值，比如2,3，显示效果如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14nobdoxij20md08fq3a.jpg)

需要说明一点，上面webkit方式一般移动端用到的比较多，对于pc端使用webkit兼容性不是那么好。比如上面的webkit在谷歌浏览器ok,在IE下就不ok了。
