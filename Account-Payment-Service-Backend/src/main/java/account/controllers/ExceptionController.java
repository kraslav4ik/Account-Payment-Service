package account.controllers;

import account.exceptions.CustomErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<CustomErrorMessage> handleDateTimeParseException(
            DateTimeParseException e, WebRequest request) {

        CustomErrorMessage body = new CustomErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                "Bad Request",
                "Wrong period format",
                (String) request.getAttribute("org.springframework.web.util.UrlPathHelper.PATH", 0));

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public void handleConstraintViolationException(ConstraintViolationException exception,
                                                   ServletWebRequest webRequest) throws IOException {
        assert webRequest.getResponse() != null;
        webRequest.getResponse().sendError(HttpStatus.BAD_REQUEST.value(), "Not valid");
    }
}
