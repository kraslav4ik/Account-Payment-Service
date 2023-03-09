package account.controllers;


import account.dto.DeletePaymentRequestDTO;
import account.dto.PaymentResponseDTO;
import account.dto.SalaryInfoDTO;
import account.entities.Payment;
import account.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class PaymentsController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentsController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("api/acct/payments")
    public List<SalaryInfoDTO> getAllPayments() {
        return this.paymentService.getAllPayments();
    }

    @PostMapping("api/acct/payments")
    public PaymentResponseDTO postPayments(@RequestBody @Valid List<Payment> payments) {
        return this.paymentService.addPayments(payments);
    }

    @PutMapping("api/acct/payments")
    public PaymentResponseDTO updatePayment(@RequestBody @Valid Payment payment) {
        return this.paymentService.updatePayment(payment);
    }

    @DeleteMapping("api/acct/payments")
    public PaymentResponseDTO deletePayment(@RequestBody @Valid DeletePaymentRequestDTO paymentToDelete) {
        return this.paymentService.deletePayment(paymentToDelete);
    }

    @GetMapping("api/empl/payment")
    public ResponseEntity<?> getSalary(@RequestParam(required = false) String period, @AuthenticationPrincipal UserDetails user) {
        if (period == null) {
            return new ResponseEntity<>(this.paymentService.getPaymentsByUser(user.getUsername()), HttpStatus.OK);
        }

        YearMonth yearMonth = YearMonth.parse(period, DateTimeFormatter.ofPattern("MM-yyyy"));
        Optional<SalaryInfoDTO> salary = this.paymentService.getSinglePayment(user.getUsername(), yearMonth);
        if (salary.isEmpty()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(salary.get(), HttpStatus.OK);


    }
}
