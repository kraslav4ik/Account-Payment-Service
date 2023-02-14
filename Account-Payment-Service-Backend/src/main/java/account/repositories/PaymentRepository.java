package account.repositories;

import account.entities.Payment;
import account.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, Long> {

    Payment findByUserAndPeriod(User user, YearMonth period);
    List<Payment> findByUserOrderByPeriodDesc(User user);
    boolean existsByUserAndPeriod(User user, YearMonth period);

    List<Payment> findAll();
}
