package com.imxiaolong.leopard.leopardbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author :  sherlonWang
 * @description :  add some desc...
 * @date: 2022/07/16
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student implements Serializable {
    private String name;
    private Integer age;
}
