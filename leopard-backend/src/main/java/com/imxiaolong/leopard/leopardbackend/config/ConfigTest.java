package com.imxiaolong.leopard.leopardbackend.config;

import com.imxiaolong.leopard.leopardbackend.entity.Student;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author :  sherlonWang
 * @description :  add some desc...
 * @date: 2022/07/16
 */
@Configuration
public class ConfigTest {

    @Bean
    public Student student() {
        return new Student("tom",18);
    }
}
