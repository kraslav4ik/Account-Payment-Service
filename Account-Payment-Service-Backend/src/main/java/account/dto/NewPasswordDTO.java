package account.dto;

import account.services.ValidPassword;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;

public class NewPasswordDTO {

    @NotEmpty
    @ValidPassword
    @JsonProperty("new_password")
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}