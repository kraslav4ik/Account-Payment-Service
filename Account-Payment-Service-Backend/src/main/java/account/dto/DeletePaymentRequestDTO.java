package account.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.time.YearMonth;

public record DeletePaymentRequestDTO(@NotBlank @JsonProperty("employee") String email, @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-yyyy") YearMonth period){}
