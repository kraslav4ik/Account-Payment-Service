package account.services;

import account.dto.DeletePaymentRequestDTO;
import account.dto.PaymentResponseDTO;
import account.dto.SalaryInfoDTO;
import account.entities.Payment;
import account.entities.Role;
import account.entities.User;
import account.exceptions.AdministratorPaymentException;
import account.exceptions.DuplicateRecordsException;
import account.exceptions.NoSuchUserException;
import account.repositories.PaymentRepository;
import account.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(UserRepository userRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public PaymentResponseDTO addPayments(List<Payment> payments) {
        payments.forEach(p -> {
            String email = p.getEmail();
            List<User> lst = this.userRepository.findByEmail(email);
            if (lst.isEmpty()) {
                throw new NoSuchUserException();
            }
            User user = lst.get(0);
            if (paymentRepository.existsByUserAndPeriod(user, p.getPeriod())) {
                throw new DuplicateRecordsException();
            }
            if (user.getRoles().contains(Role.ADMIN)) {
                throw new AdministratorPaymentException();
            }
            p.setUser(user);
            this.paymentRepository.save(p);
        });
        return new PaymentResponseDTO("Added successfully!");
    }

    public PaymentResponseDTO updatePayment(Payment payment) {
        String email = payment.getEmail();
        List<User> lst = this.userRepository.findByEmail(email);
        if (lst.isEmpty()) {
            throw new NoSuchUserException();
        }

        User user = lst.get(0);
        Payment existPayment = this.paymentRepository.findByUserAndPeriod(user, payment.getPeriod());
        if (existPayment == null) {
            payment.setUser(user);
            this.paymentRepository.save(payment);
        }
        else {
            existPayment.setSalary(payment.getSalary());
            this.paymentRepository.save(existPayment);
        }
        return new PaymentResponseDTO("Updated successfully!");
    }

    public PaymentResponseDTO deletePayment(DeletePaymentRequestDTO paymentToDelete) {
        String email = paymentToDelete.email();
        YearMonth period = paymentToDelete.period();
        List<User> lst = this.userRepository.findByEmail(email);
        if (lst.isEmpty()) {
            throw new NoSuchUserException();
        }

        User user = lst.get(0);
        Payment existPayment = this.paymentRepository.findByUserAndPeriod(user, period);
        if (existPayment == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the payment you want to delete");
        }
        this.paymentRepository.delete(existPayment);
        return new PaymentResponseDTO("Deleted successfully!");
    }

    public List<SalaryInfoDTO> getAllPayments() {
        return this.paymentRepository.findAll().stream().map(p -> new SalaryInfoDTO(p.getUserId().getName(),
                p.getUserId().getLastname(), p.getUserId().getEmail(), p.getPeriod(), p.getSalary())).toList();
    }

    public Optional<SalaryInfoDTO> getSinglePayment(String email, YearMonth period) {
        User user = this.userRepository.findByEmail(email).get(0);
        Payment payment = this.paymentRepository.findByUserAndPeriod(user, period);
        if (payment == null) {
            return Optional.empty();
        }
        return Optional.of(new SalaryInfoDTO(user.getName(), user.getLastname(), user.getEmail(), payment.getPeriod(), payment.getSalary()));
    }

    public List<SalaryInfoDTO> getPaymentsByUser(String email) {
        User user = this.userRepository.findByEmail(email).get(0);
        List<Payment> payments = this.paymentRepository.findByUserOrderByPeriodDesc(user);
        return payments.stream().map(p -> new SalaryInfoDTO(user.getName(), user.getLastname(), user.getEmail(), p.getPeriod(), p.getSalary())).toList();
    }
}
