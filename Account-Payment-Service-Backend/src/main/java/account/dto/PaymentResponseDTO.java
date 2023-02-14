package account.dto;

public class PaymentResponseDTO {

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;

    public PaymentResponseDTO(String status) {
        this.status = status;
    }
}
