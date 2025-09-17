package masecla.remindify.dto;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TaskDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String task;
    private String description;
    private String dueDate;
}
