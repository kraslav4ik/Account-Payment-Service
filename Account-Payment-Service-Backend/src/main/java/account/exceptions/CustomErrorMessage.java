package account.exceptions;

import java.time.LocalDateTime;

public class CustomErrorMessage {
    private int status;
    private LocalDateTime timestamp;

    private String error;
    private String message;
    private String path;


    public CustomErrorMessage(
            int status,
            LocalDateTime timestamp,
            String error,
            String message,
            String path) {

        this.status = status;
        this.timestamp = timestamp;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

}
