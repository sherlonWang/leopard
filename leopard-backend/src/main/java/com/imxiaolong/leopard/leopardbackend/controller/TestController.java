package com.imxiaolong.leopard.leopardbackend.controller;

import com.imxiaolong.leopard.leopardbackend.config.ConfigProperties;
import com.imxiaolong.leopard.leopardbackend.entity.Student;
import com.imxiaolong.leopard.leopardcommon.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author :  sherlonWang
 * @description :  add some desc...
 * @date: 2022/07/16
 */
@RestController
@RequestMapping("/test")
@Slf4j
public class TestController {

    @Autowired
    Student student;

    @Autowired
    ConfigProperties configProperties;

    @Value("${leopard.user.myname}")
    private String myName;

    @GetMapping("/hello")
    public Object test1() {
        log.info("im info msg");
        log.error("im error msg");
        System.out.println(myName);
        return configProperties;
    }
}
