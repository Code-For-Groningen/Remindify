package masecla.remindify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import masecla.remindify.dto.TaskDto;
import masecla.remindify.services.TaskConsumerService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
@Slf4j
@AllArgsConstructor(onConstructor_ = @Autowired)
public class TaskController {

    private TaskConsumerService consumerService;

    @PostMapping("/task")
    public ResponseEntity<String> createTask(@RequestBody TaskDto taskDto) {
        log.info("Received new task: {}", taskDto);        

        consumerService.broadcastTask(taskDto);

        return ResponseEntity.ok("Task received successfully");
    }
}
