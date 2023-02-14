package account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

public class SalaryInfoDTO {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("MMMM-yyyy");

    private String name;

    private String email;

    @JsonProperty("lastname")
    private String lastName;

    private String period;

    private String salary;

    public SalaryInfoDTO(String name, String lastName, String email, YearMonth yearMonth, Long payment) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.period = yearMonth.format(dateTimeFormatter);
        this.salary = String.format("%d dollar(s) %d cent(s)", payment / 100, payment % 100);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
