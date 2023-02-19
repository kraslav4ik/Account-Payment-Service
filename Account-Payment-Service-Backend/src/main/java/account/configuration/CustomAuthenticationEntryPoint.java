package account.configuration;

import account.dto.EventResponseDTO;
import account.entities.Role;
import account.entities.User;
import account.exceptions.NoSuchUserException;
import account.services.SecurityEventsService;
import account.services.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import account.constants.Constants;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Enumeration;

import static account.configuration.HttpRequestDispatcher.getNameFromRequest;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper mapper = new ObjectMapper();
    @Autowired
    private UserDetailsServiceImpl userService;
    @Autowired
    private SecurityEventsService securityService;


    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        String upd = request.getHeader("authorization");
//        System.err.println(Arrays.toString(request.getParameterMap().values().toArray()));
        String message = "";
        if (upd != null && upd.matches("Basic .*")) {
            message = logEvents(request);
        }
        proceedException(request, response, message);
    }

    private void proceedException(HttpServletRequest request,
                                  HttpServletResponse response,
                                  String message) throws IOException {
        int status = HttpStatus.UNAUTHORIZED.value();
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(status);
        ObjectMapper mapper = JsonMapper.builder()
                .addModule(new JavaTimeModule())
                .build();

        EventResponseDTO repBody = new EventResponseDTO(
                LocalDateTime.now(), status, "Unauthorized", message, request.getRequestURI()
        );
        response.getWriter().write(mapper.writeValueAsString(repBody));
    }

    private String logEvents(HttpServletRequest request) {
        increaseFailedAttempts(request);
        if (checkBruteForce(request))
            return "User account is locked";
        else
            this.securityService.saveLoginFailedEvent(request);
        return "";
    }



    private void increaseFailedAttempts(HttpServletRequest request) {
        try {
            User user = this.userService.loadUserByUsername(getNameFromRequest(request));
            if (hasAdminRole(user))
                return;
            user.setFailedAttempts(user.getFailedAttempts() + 1);
            user.setLastFailed(true);
            this.userService.updateUser(user);
        }
        catch (NoSuchUserException ignored) {
        }
    }

    private boolean hasAdminRole(User user) {
        for (Role role : user.getRoles()) {
            if (role == Role.ADMIN)
                return true;
        }
        return false;
    }

    private boolean checkBruteForce(HttpServletRequest request) {
        try {
            User user = this.userService.loadUserByUsername(getNameFromRequest(request));
            if (user.getFailedAttempts() == Constants.MAX_FAILED_ATTEMPTS) {
                this.securityService.saveLoginFailedEvent(request);
                this.securityService.saveBruteForceEvent(request);
                this.securityService.saveLockUserEvent(request);
            }
            return user.getFailedAttempts() >= Constants.MAX_FAILED_ATTEMPTS;
        }
        catch (NoSuchUserException ignore) {
            return false;
        }
    }

}