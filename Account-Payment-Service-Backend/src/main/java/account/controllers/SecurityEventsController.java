package account.controllers;


import account.entities.Event;
import account.services.SecurityEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SecurityEventsController {

    private final SecurityEventsService securityEventsService;

    @Autowired
    public SecurityEventsController(SecurityEventsService service) {
        this.securityEventsService = service;
    }

    @GetMapping("/api/security/events")
    public List<Event> getEvents() {
        return this.securityEventsService.getAllEvents();
    }
}
