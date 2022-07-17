---
sidebar: auto
title: Spring+Shiro+Redis实现tomcat集群session共享问题
date: 2021-12-25
categories:
 - 后端
tags:
 - Redis
 - Spring
 - Shiro
 - Session
---

<Copyright link="https://imxiaolong.com/views/backend/Spring+Shiro+Redis实现tomcat集群session共享问题.html" />

最近在spring中集成了shiro框架并用redis实现session共享，发现项目启动后运行时老是报错，信息如下：

org.apache.shiro.session.UnknownSessionException: There is no session with id [xxxx]的问题，具体问题如下图：

```bash
org.apache.shiro.session.UnknownSessionException: There is no session with id [4B095106E5572FB4510462789898EF78]
	at org.apache.shiro.session.mgt.eis.AbstractSessionDAO.readSession(AbstractSessionDAO.java:170)
	at org.apache.shiro.session.mgt.DefaultSessionManager.retrieveSessionFromDataSource(DefaultSessionManager.java:236)
	at org.apache.shiro.session.mgt.DefaultSessionManager.retrieveSession(DefaultSessionManager.java:222)
	at com.sherlon.shiro.session.CustomSessionManager.retrieveSession(CustomSessionManager.java:36)
	at org.apache.shiro.session.mgt.AbstractValidatingSessionManager.doGetSession(AbstractValidatingSessionManager.java:118)
	at org.apache.shiro.session.mgt.AbstractNativeSessionManager.lookupSession(AbstractNativeSessionManager.java:148)
	at org.apache.shiro.session.mgt.AbstractNativeSessionManager.getSession(AbstractNativeSessionManager.java:140)
	at org.apache.shiro.mgt.SessionsSecurityManager.getSession(SessionsSecurityManager.java:156)
	at org.apache.shiro.mgt.DefaultSecurityManager.resolveContextSession(DefaultSecurityManager.java:460)
	at org.apache.shiro.mgt.DefaultSecurityManager.resolveSession(DefaultSecurityManager.java:446)
	at org.apache.shiro.mgt.DefaultSecurityManager.createSubject(DefaultSecurityManager.java:342)
	at org.apache.shiro.subject.Subject$Builder.buildSubject(Subject.java:845)
	at org.apache.shiro.web.subject.WebSubject$Builder.buildWebSubject(WebSubject.java:148)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.createSubject(AbstractShiroFilter.java:292)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:359)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:347)
	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:263)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:219)
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:106)
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:501)
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:142)
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:79)
	at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:610)
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:88)
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:516)
	at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1086)
	at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:659)
	at org.apache.coyote.http11.Http11AprProtocol$Http11ConnectionHandler.process(Http11AprProtocol.java:285)
	at org.apache.tomcat.util.net.AprEndpoint$SocketProcessor.doRun(AprEndpoint.java:2431)
	at org.apache.tomcat.util.net.AprEndpoint$SocketProcessor.run(AprEndpoint.java:2420)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
	at java.lang.Thread.run(Thread.java:745)
```

之后在网上搜索发现这有一个坑！原来shiro的DefaultWebSessionManager类中，默认Cookie名称是JSESSIONID，与jetty, tomcat(如tomcat容器名也是JSESSIONID)等servlet容器名冲突,, 当跳出shiro servlet时,error-page容器会为JSESSIONID重新分配值导致登录会话丢失!

为了解决这个问题，在shiro配置中sessionManager里加上一个与容器不冲突的JSESSIONID就好了，如下：

```xml
        <!--sessionManager对象-->
	<bean id="sessionManager" class="com.sherlon.shiro.session.CustomSessionManager">
		<property name="sessionDAO" ref="redisSessionDao"/>
		<!-- 注意这里是一个坑!!
		因为在shiro的DefaultWebSessionManager类中，默认Cookie名称是JSESSIONID，
		这样的话与servlet容器名冲突, 如jetty, tomcat等默认JSESSIONID,
		当跳出shiro servlet时如error-page容器会为JSESSIONID重新分配值导致登录会话丢失! -->
		<!-- 所以需要自己指定一个与项目运行容器不冲突的sessionID -->
		<property name="sessionIdCookie" ref="simpleCookie"/>
	</bean>
	<bean id="simpleCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
		<constructor-arg name="name" value="shiro.sesssion"/>
		<property name="path" value="/"/>
	</bean>
```

配置以上sessionIdCookie后，运行后正常。
