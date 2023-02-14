package account.repositories;

import account.entities.Event;
import org.springframework.data.repository.CrudRepository;

public interface SecurityEventsRepository extends CrudRepository<Event, Long> {
}
