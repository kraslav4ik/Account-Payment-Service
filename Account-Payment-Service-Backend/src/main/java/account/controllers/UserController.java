package account.controllers;


import account.configuration.JwtUtils;
import account.dto.LoginRequestDTO;
import account.dto.NewPasswordDTO;
import account.dto.NewPasswordResponseDTO;
import account.dto.UpdateStatusDTO;
import account.entities.Action;
import account.entities.User;
import account.services.SecurityEventsService;
import account.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@Validated
@RequestMapping("/api/auth")
@CrossOrigin(origins = "/**", maxAge = 3600, allowCredentials = "true")
public class UserController {

    private final UserDetailsServiceImpl userService;
    private final SecurityEventsService eventsService;

    private final JwtUtils jwtUtils;

    private final AuthenticationManager authManager;

    @Autowired
    public UserController(UserDetailsServiceImpl userService, SecurityEventsService eventsService,
                          JwtUtils jwtUtils, AuthenticationManager authManager) {
        this.userService = userService;
        this.eventsService = eventsService;
        this.jwtUtils = jwtUtils;
        this.authManager = authManager;
    }

    @PostMapping("/signup")
    public User registerUser(@RequestBody @Valid User userToRegister, HttpServletRequest request) {
        User registeredUser = this.userService.save(userToRegister);
        this.eventsService.saveEvent(Action.CREATE_USER, registeredUser.getEmail(), request);
        return registeredUser;
    }

    @PostMapping("/login")
//    @CrossOrigin(origins = "/**", allowCredentials = "true")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        System.err.println("login method");
        Authentication authentication = this.authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = this.userService.loadUserByUsername(loginRequestDTO.username());
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie((UserDetails) authentication.getPrincipal());
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new UpdateStatusDTO("User's JWT", "Deleted"));
    }
    @GetMapping("/verifyJWT")
    public User verifyJWT(@AuthenticationPrincipal UserDetails userDetails) {
        return this.userService.loadUserByUsername(userDetails.getUsername());
    }

    @PostMapping("/changepass")
    public NewPasswordResponseDTO changePassword(@RequestBody @Valid NewPasswordDTO newPasswordDTO,
                                                 HttpServletRequest request) {
        NewPasswordResponseDTO resp = this.userService.changePassword(
                request.getUserPrincipal().getName(), newPasswordDTO.getNewPassword());
        this.eventsService.saveEvent(Action.CHANGE_PASSWORD, resp.getEmail(), request);
        return resp;
    }
}
