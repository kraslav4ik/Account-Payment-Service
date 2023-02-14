package account.configuration;

import account.entities.Action;
import account.services.SecurityEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Autowired
    private SecurityEventsService securityEventsService;


    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException exc) throws IOException {

        this.securityEventsService.saveEvent(
                Action.ACCESS_DENIED, request.getRequestURI(), request);
        response.sendError(403, "Access Denied!");
    }

}