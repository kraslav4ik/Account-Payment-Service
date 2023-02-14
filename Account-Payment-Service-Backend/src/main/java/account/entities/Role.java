package account.entities;

import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ACCOUNTANT("ROLE_ACCOUNTANT", "ACCOUNTANT", Group.BUSINESS),
    ADMIN("ROLE_ADMINISTRATOR", "ADMINISTRATOR", Group.ADMINISTRATIVE),
    AUDITOR("ROLE_AUDITOR", "AUDITOR", Group.BUSINESS),
    USER("ROLE_USER", "USER", Group.BUSINESS);

    final String representation;
    final String requestRepresentation;

    final Group group;

    Role(String representation, String requestRepresentation, Group group) {
        this.representation = representation;
        this.requestRepresentation = requestRepresentation;
        this.group = group;
    }

    @JsonValue
    public String getRepresentation() {
        return representation;
    }

    public String getRequestRepresentation() {
        return this.requestRepresentation;
    }

    public Group getGroup() {
        return group;
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}