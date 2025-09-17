package masecla.remindify.repository;

import masecla.remindify.dto.TaskDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskDto, Long> {
}
