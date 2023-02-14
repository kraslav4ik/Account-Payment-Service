package account.controllers;

import account.dto.ChangeRoleDTO;
import account.dto.StatusUpdateResponseDTO;
import account.dto.UpdateStatusDTO;
import account.dto.UserDeletedResponseDTO;
import account.entities.Action;
import account.entities.User;
import account.services.SecurityEventsService;
import account.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/api/admin")
public class AdminController {

    private final UserDetailsServiceImpl userService;
    private final SecurityEventsService eventsService;

    @Autowired
    public AdminController(UserDetailsServiceImpl userService, SecurityEventsService eventsService) {
        this.userService = userService;
        this.eventsService = eventsService;
    }

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PutMapping("/user/role")
    public User changeRole(@RequestBody @Valid ChangeRoleDTO changeRoleDTO,
                           HttpServletRequest request) {

        User user = this.userService.updateRole(changeRoleDTO);
        String operation = changeRoleDTO.getOperation();
        Action action = (operation.equals("REMOVE") ? Action.REMOVE_ROLE : Action.GRANT_ROLE);
        String object = String.format("%s role %s %s %s",
                operation.substring(0,1).toUpperCase() + operation.substring(1).toLowerCase(),
                changeRoleDTO.getRole(), (operation.equals("REMOVE")) ? "from" : "to", user.getEmail());
        this.eventsService.saveEvent(action, object, request);
        return user;
    }

    @DeleteMapping("/user/{email}")
    public UserDeletedResponseDTO deleteUser(@PathVariable String email, HttpServletRequest request) {
        this.userService.deleteByEmail(email);
        this.eventsService.saveEvent(Action.DELETE_USER, email, request);
        return new UserDeletedResponseDTO(email);
    }

    @PutMapping("/user/access")
    public StatusUpdateResponseDTO changeStatus(@RequestBody @Valid UpdateStatusDTO update, HttpServletRequest request) {
        String email = update.getUser().toLowerCase();
        if (update.getOperation().equals("LOCK")) {
            this.userService.lock(email);
            this.eventsService.saveEvent(Action.LOCK_USER, String.format("Lock user %s", email), request);
            return new StatusUpdateResponseDTO(String.format("User %s locked!", email));
        }
        this.userService.unlock(email);
        this.eventsService.saveEvent(Action.UNLOCK_USER, String.format("Unlock user %s", email), request);
        return new StatusUpdateResponseDTO(String.format("User %s unlocked!", email));
    }

}
