package masecla.remindify.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import masecla.remindify.consumers.TaskConsumer;
import masecla.remindify.dto.TaskDto;

@Slf4j
@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class TaskConsumerService {

    private Map<String, TaskConsumer> availableConsumers;

    public void registerConsumer(String listType, TaskConsumer consumer) {
        availableConsumers.put(listType, consumer);
    }

    public void broadcastTask(TaskDto task){
        for (TaskConsumer consumer : availableConsumers.values()) {
            try {
                consumer.sendTaskToList(task);
                log.info("Task sent to {} consumer", consumer.getName());
            } catch (Exception e) {
                log.error("Failed to send task to {} consumer: {}", consumer.getName(), e.getMessage());
            }
        }
    }
}
