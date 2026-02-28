package org.schedule.schedulemanaging.service.notification;

import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class MessageTemplateEngine {

    public String replace(String template, Map<String, String> variables) {
        String result = template;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            result = result.replace("#{" + entry.getKey() + "}", entry.getValue());
        }
        return result;
    }
}
