package masecla.remindify.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import masecla.remindify.dto.TaskDto;
import masecla.remindify.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class TaskService {

    private TaskRepository taskRepository;

    public void saveTask(TaskDto task) {
        TaskDto persisted = task.getId() == null ? taskRepository.save(task) : task;
        log.info("Task with id {} has been created.", persisted.getId());
    }
}
