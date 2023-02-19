package account.services;

import account.exceptions.EmailDomainException;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

    @Value("${account.correctDomain}")
    private String correctDomain;


    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        System.err.println(this.correctDomain);
        String emailRegex = String.format(".+%s$", this.correctDomain);
        System.err.println(emailRegex);
        System.err.println(value);
        if (!value.matches(emailRegex)) {
            System.err.println("NO MATCH");
            throw new EmailDomainException();
        }
        System.err.println("MATCH");
        return true;
    }
}
