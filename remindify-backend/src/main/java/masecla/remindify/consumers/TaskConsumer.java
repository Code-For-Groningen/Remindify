package masecla.remindify.consumers;

import org.springframework.stereotype.Component;

import masecla.remindify.dto.TaskDto;

/**
 * Abstract class representing a consumer that processes tasks.
 * Implementations should provide the logic to send tasks to a list.
 */
@Component
public abstract class TaskConsumer {
    /**
     * Sends the given task to a list.
     *
     * @param task The task to be sent.
     */
    public abstract void sendTaskToList(TaskDto task) throws Exception;

    /**
     * Get the name of the given consumer.
     * 
     * @return The name of the consumer.
     */
    public abstract String getName();
}
