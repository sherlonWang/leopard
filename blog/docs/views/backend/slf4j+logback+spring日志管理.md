---
sidebar: auto
title: slf4j+logback+spring日志管理
date: 2020-3-4
categories:
 - 后端
tags:
 - slf4j
 - logback
 - 日志
---

<Copyright link="https://imxiaolong.com/views/backend/slf4j+logback+spring日志管理.html" />

slf4j(simple logging facade for java):从字面意思理解就是一个简单的日志门面。它不是一个具体的日志解决方案，而是为其他日志框架提供一个统一的接口(门面)，便于项目中不同模块各种日志框架的统一管理。logback就是其中一个具体的日志框架，今天就来记录下slf4j+logback集成到spring中的具体实现方案。

##### 1.jar包：

 logback-classic(其中包含logback-core,slf4j-api,不需要额外再配置logback-core和slf4j-api)

logback-ext-spring(logback集成到spring中需要该jar包，spring中配置logback监听LogbackConfigListener就是用到该jar包)

 jcl-over-slf4j(java-common-logging框架和slf4j的桥接jar包，有了这个jar包，spring框架中通过jcl记录的日志信息就可以输出到自己用slf4j记录的日志文件中了)

 上述jar包对应的maven坐标如下（版本可以根据自己的项目选择，注意兼容性）：

```xml
    <!-- 日志框架使用slf4j+logback+spring -->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.3</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.logback-extensions/logback-ext-spring -->
    <dependency>
      <groupId>org.logback-extensions</groupId>
      <artifactId>logback-ext-spring</artifactId>
      <version>0.1.4</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.slf4j/jcl-over-slf4j -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
      <version>1.7.25</version>
    </dependency>
```

##### 2.logback.xml配置

该配置文件位置：main/resources/logback.xml ，项目资源根目录。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
 
<!--
 属性解释：
 scan="true" ：自动扫描该配置文件，若有修改则重新加载该配置文件
 scanPeriod="60 seconds" ：每隔60s扫描加载一次(其他单位：milliseconds,seconds,minutes,hours)
 debug="false"：为"true"时打印logback内部状态(默认当logback运行出错时才会打印内部状态)
 -->
<configuration scan="true" scanPeriod="60 seconds" debug="true">
 
    <!-- 动态日志级别 -->
    <jmxConfigurator />
 
    <!-- 设置 logger context 名称,一旦设置不可改变，默认为default -->
    <contextName>sherlon</contextName>
 
    <!-- 定义日志文件 输出位置 -->
    <property name="log_dir" value="sherlon_log" />
 
    <!-- ConsoleAppender 控制台输出日志 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>
                <!-- 设置日志输出格式 -->
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger - %msg%n
            </pattern>
        </encoder>
    </appender>
 
    <!-- ERROR级别日志 -->
    <!-- 滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件 RollingFileAppender -->
    <appender name="ERROR"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 过滤器，只记录WARN级别的日志 -->
        <!-- 日志级别等于配置级别，过滤器会根据onMath 和 onMismatch接收或拒绝日志。 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 设置过滤级别 -->
            <level>ERROR</level>
            <!-- 用于配置符合过滤条件的操作 -->
            <onMatch>ACCEPT</onMatch>
            <!-- 用于配置不符合过滤条件的操作 -->
            <onMismatch>DENY</onMismatch>
        </filter>
        <!-- 最常用的滚动策略，它根据时间来制定滚动策略.既负责滚动也负责触发滚动 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志输出位置 可相对、和绝对路径 -->
            <fileNamePattern>
                ${log_dir}/error/%d{yyyy-MM-dd}/error-log.log
            </fileNamePattern>
            <!-- 可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。
            假设设置每个月滚动(把fileNamePattern改为${log_dir}/error/%d{yyyy-MM}/error-log.log)，
            且<maxHistory>是6，则只保存最近6个月的文件，删除之前的旧文件。
            注意，删除旧文件是，那些为了归档而创建的目录也会被删除 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>
                <!-- 设置日志输出格式 -->
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger - %msg%n
            </pattern>
        </encoder>
    </appender>
 
    <!-- WARN级别日志 appender -->
    <appender name="WARN"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 过滤器，只记录WARN级别的日志 -->
        <!-- 果日志级别等于配置级别，过滤器会根据onMath 和 onMismatch接收或拒绝日志。 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 设置过滤级别 -->
            <level>WARN</level>
            <!-- 用于配置符合过滤条件的操作 -->
            <onMatch>ACCEPT</onMatch>
            <!-- 用于配置不符合过滤条件的操作 -->
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志输出位置 可相对、和绝对路径 -->
            <fileNamePattern>
                ${log_dir}/warn/%d{yyyy-MM-dd}/warn-log.log
            </fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -%msg%n
            </pattern>
        </encoder>
    </appender>
 
    <!-- INFO级别日志 appender -->
    <appender name="INFO"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>
                ${log_dir}/info/%d{yyyy-MM-dd}/info-log.log
            </fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -%msg%n
            </pattern>
        </encoder>
    </appender>
 
    <!-- DEBUG级别日志 appender -->
    <appender name="DEBUG"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>DEBUG</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>
                ${log_dir}/debug/%d{yyyy-MM-dd}/debug-log.log
            </fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -%msg%n
            </pattern>
        </encoder>
    </appender>
 
    <!-- TRACE级别日志 appender -->
    <appender name="TRACE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>TRACE</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>
                ${log_dir}/trace/%d{yyyy-MM-dd}/trace-log.log
            </fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -%msg%n
            </pattern>
        </encoder>
    </appender>
 
    <logger name="com.sherlon" level="DEBUG">
 
        <appender-ref ref="INFO"/>
 
        <!-- <appender-ref ref="debug"></appender-ref> -->
        <appender-ref ref="error"/>
 
    </logger>
 
    <!-- root级别 DEBUG -->
    <root>
        <!-- 打印debug级别日志及以上级别日志 -->
        <level value="DEBUG" />
        <!-- 控制台输出 -->
        <appender-ref ref="STDOUT" />
        <!-- 文件输出 -->
        <appender-ref ref="ERROR" />
        <appender-ref ref="INFO" />
        <appender-ref ref="WARN" />
        <appender-ref ref="DEBUG" />
        <appender-ref ref="TRACE" />
    </root>
</configuration>
```

其中需要修改的是logger标签中的内容，单独提出来如下，com.sherlon是我的项目目录，表示该包下的所有日志记录按照设置的日志级别来记录，改成自己的项目目录文件夹即可：

```xml
    <logger name="com.sherlon" level="DEBUG">
        <appender-ref ref="INFO"/>
        <!-- <appender-ref ref="debug"></appender-ref> -->
        <appender-ref ref="error"/>
    </logger>
```

贴出来的xml中关键属性有注释，具体可查看如下链接：

How to log in Spring with SLF4J and Logback

注意：以上xml中配置日志输出位置采用相对位置，web项目发布到tomcat中时，日志信息会在tomcat目录的bin目录下保存该项目的日志文件。如果在main方法中测试logger，会在项目根路径下创建日志。这里把我坑了一回-_-||。

##### 3.web.xml配置

应为是web项目，需要在web.xml中配置logback的监听：

```xml
    <!-- 添加日志监听器 -->
    <context-param>
        <param-name>logbackConfigLocation</param-name>
        <param-value>classpath:logback.xml</param-value>
    </context-param>
    <listener>
        <listener-class>ch.qos.logback.ext.spring.web.LogbackConfigListener</listener-class>
    </listener>
```

好了，到此为止，基本的配置就完成了。下面来一个测试用例:

```java
package com.sherlon.login.web;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
 
/**
 * ${log测试}
 *
 * @author WangXiaoLong
 * @version 1.0
 * @create 2018-11-27 0:46
 */
@Controller
public class LogTestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LogTestController.class);
    @RequestMapping(value = "/test.rdm",method = RequestMethod.GET)
    @ResponseBody
    public void test(){
        LOGGER.debug("======debug level message=====");
        LOGGER.info("======info level message=====");
        LOGGER.warn("======warn level message=====");
        LOGGER.error("======error level message=====");
    }
}
```

启动项目访问以上路由，查看tomcat中bin下对应的日志记录文件可以看到，test中记录的信息已经保存在相应级别的日志文件中。

Done!
