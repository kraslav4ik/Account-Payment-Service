package account.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The user cannot combine administrative and business roles!")
public class IncompatibleRolesException extends RuntimeException{
}
