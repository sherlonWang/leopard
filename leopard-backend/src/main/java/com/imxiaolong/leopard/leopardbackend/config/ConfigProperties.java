package com.imxiaolong.leopard.leopardbackend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author :  sherlonWang
 * @description :  Springboot 自定义属性配置类
 * @date: 2022/07/16
 */
@Component
@ConfigurationProperties(prefix = "leopard.user")
/*
 * 指定所属配置文件位置，不指定则默认为resources跟路径下application文件
 */
@PropertySource(value = "classpath:application.yml", encoding = "utf-8")
@Data
public class ConfigProperties {
    private String name;
    private Integer age;
    private String sex;
}
