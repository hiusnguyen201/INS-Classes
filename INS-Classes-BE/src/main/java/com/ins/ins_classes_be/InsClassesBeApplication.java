package com.ins.ins_classes_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class InsClassesBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsClassesBeApplication.class, args);
	}

}
