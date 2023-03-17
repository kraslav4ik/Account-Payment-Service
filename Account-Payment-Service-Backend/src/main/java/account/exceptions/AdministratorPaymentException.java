package account.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Administrator can't have any payments")
public class AdministratorPaymentException extends RuntimeException{

}
