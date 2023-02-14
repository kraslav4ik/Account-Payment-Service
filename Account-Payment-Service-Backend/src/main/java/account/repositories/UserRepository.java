package account.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import account.entities.User;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findAllByOrderByIdAsc();
}
