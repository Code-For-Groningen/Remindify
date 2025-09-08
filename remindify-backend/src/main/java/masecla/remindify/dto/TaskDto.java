package masecla.remindify.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private String task;
    private String description;
    private LocalDateTime dueDate;
}
