package account.dto;

public class UpdateStatusDTO {

    private final String user;
    private final String operation;

    public UpdateStatusDTO(String user, String operation) {
        this.user = user;
        this.operation = operation;
    }


    public String getUser() {
        return user;
    }

    public String getOperation() {
        return operation;
    }
}
