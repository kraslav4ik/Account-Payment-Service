package account.dto;

public class UserDeletedResponseDTO {

    private String user;
    private String status;

    public UserDeletedResponseDTO(String userEmail) {
        this.user = userEmail;
        this.status = "Deleted successfully!";
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
