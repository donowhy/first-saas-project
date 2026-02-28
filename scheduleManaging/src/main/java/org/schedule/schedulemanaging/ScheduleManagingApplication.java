package org.schedule.schedulemanaging;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class ScheduleManagingApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScheduleManagingApplication.class, args);
    }

}
