package masecla.remindify.consumers.instances;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import masecla.remindify.consumers.TaskConsumer;
import masecla.remindify.dto.TaskDto;

@Component
public class TodoistTaskConsumer extends TaskConsumer {

    private static final String TODOIST_API_URL = "https://api.todoist.com/";

    @Data
    @AllArgsConstructor
    private static class TodoistCreateTaskRequest {
        private String content;
        private String description;

        @JsonProperty("due_string")
        private String dueString;

        @JsonProperty("due_datetime")
        private String dueDatetime;
        private int priority;
    }

    @Value("${todoist.api.token}")
    private String todoistApiToken;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public void sendTaskToList(TaskDto task) throws JsonProcessingException, IOException {
        TodoistCreateTaskRequest request = new TodoistCreateTaskRequest(
            task.getTask(),
            task.getDescription() != null ? task.getDescription() : "",
            task.getDueDate() != null ? task.getDueDate() : null,
            task.getDueDate() != null ? task.getDueDate() : null,
            1
        );

        Jsoup.connect(TODOIST_API_URL + "api/v1/tasks")
            .header("Authorization", "Bearer " + todoistApiToken)
            .header("Content-Type", "application/json")
            .requestBody(mapper.writeValueAsString(request))
            .ignoreContentType(true)
            .post();
    }

    @Override
    public String getName() {
        return "Todoist";
    }
    
}
