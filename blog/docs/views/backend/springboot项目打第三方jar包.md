---
sidebar: auto
title: springboot项目打第三方jar包
date: 2020-08-13
categories:
 - 后端
tags:
 - springboot
 - 打包jar
 - maven
---

<Copyright link="https://imxiaolong.com/views/backend/springboot项目打第三方jar包.html" />

> 最近用springboot写了一个自己的工具库，在打jar包时遇到了问题，特此记录。

springboot默认打包插件如下，`pom.xml` 中  `plugins` 标签下：

```xml
<plugin>
	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

但是打完包后，在另一个项目中引用时，不管是通过引用本地maven坐标的形式，还是导入jar包到项目中libraries，都无法正确使用jar包中的工具类。

于是网上一通查找，说是要替换 springboot 默认的 plugin 为原生的 maven plugin插件 ，原生 plugin 如下：

```xml
 <plugin>
 		<groupId>org.apache.maven.plugins</groupId>
  	    <artifactId>maven-compiler-plugin</artifactId>
  	    <configuration>
  		    <source>${java.version}</source> <!--指明源码用的Jdk版本-->
  		    <target>${java.version}</target> <!--指明打包后的Jdk版本-->
  	    </configuration>               
 </plugin>
```

果然，替换后可以正常引入了，但是，又出现另一个问题：

::: danger 问题

由于要打包的项目中引用了第三方库，在用上面方法打包后，无法使用第三方库中的 api 。

:::

这就比较蛋疼了，自己想要的效果是，打完包后存储到本地maven仓库，然后直接在其他项目中引入仓库依赖即可使用。

于是又在网上找啊找，终于，找到了另一个方法，使用 Assembly 插件打包，插件如下：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>3.1.1</version>
  <configuration>
    <encoding>UTF-8</encoding>
    <descriptorRefs>
      <descriptorRef>jar-with-dependencies</descriptorRef>
    </descriptorRefs>
    <archive>
      <manifest>
        <mainClass>com.bonc.activitiinvoke.McpActivitiInvokeApplication</mainClass>
      </manifest>
    </archive>
  </configuration>
  <executions>
    <execution>
      <id>make-assembly</id>
      <phase>package</phase>
      <goals>
        <goal>single</goal>
      </goals>
    </execution>
  </executions>
</plugin>						
```

打完包后，本地仓库中会生成2个jar文件，一个是要打包的项目中的源码，另一个是项目中引入的第三方依赖。

这样，直接在其他项目pom 中引入打完的 jar 包坐标就可以使用啦。

如果想要通过本地导入的方式引入，把生成的2个jar包拷到项目中引入就可以啦。

