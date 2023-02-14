package account.services;

import account.configuration.HttpRequestDispatcher;
import account.entities.Action;
import account.entities.Event;
import account.repositories.SecurityEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

import static account.configuration.HttpRequestDispatcher.getNameFromRequest;

@Service
public class SecurityEventsService {

    private final SecurityEventsRepository repository;

    @Autowired
    public SecurityEventsService(SecurityEventsRepository repository) {
        this.repository = repository;
    }

    public List<Event> getAllEvents() {
        return (List<Event>) this.repository.findAll();
    }

    public void saveEvent(Action action, String object, HttpServletRequest request) {
        Event event = new Event();
        AuthInfo authInfo = this.parseRequest(request);
        event.setDate(LocalDateTime.now());
        event.setAction(action);
        event.setSubject(authInfo.username);
        event.setObject(object);
        event.setPath(authInfo.path);
        this.repository.save(event);
    }

    private AuthInfo parseRequest(HttpServletRequest request) {
        String authenticatedUserName = HttpRequestDispatcher.getNameFromRequest(request);
        String username = (authenticatedUserName.isBlank()) ? "Anonymous" : authenticatedUserName;
        String path = request.getRequestURI();
        return new AuthInfo(username, path);
    }

    public void saveLoginFailedEvent(HttpServletRequest request) {
        this.saveEvent(Action.LOGIN_FAILED, request.getRequestURI(), request);

    }

    public void saveBruteForceEvent(HttpServletRequest request) {
        this.saveEvent(Action.BRUTE_FORCE, request.getRequestURI(), request);

    }

    public void saveLockUserEvent(HttpServletRequest request) {

        String object = String.format("Lock user %s", getNameFromRequest(request));

        this.saveEvent(Action.LOCK_USER, object, request);
    }

    record AuthInfo(String username, String path) {}
}
