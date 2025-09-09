package masecla.remindify.dto;

import lombok.Data;

@Data
public class TaskDto {
    private String task;
    private String description;
    private String dueDate;
}
