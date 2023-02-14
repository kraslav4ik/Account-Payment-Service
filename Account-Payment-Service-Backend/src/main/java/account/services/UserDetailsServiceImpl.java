package account.services;


import account.dto.ChangeRoleDTO;
import account.dto.NewPasswordResponseDTO;
import account.entities.Group;
import account.entities.Role;
import account.constants.Constants;
import account.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import account.entities.User;
import account.repositories.UserRepository;

import java.util.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        List<User> userList = this.userRepository.findByEmail(email.toLowerCase());

        if (userList.isEmpty()) {
            throw new NoSuchUserException();
        }
        return userList.get(0);
    }

    public User save(User user) {
        String email = user.getEmail().toLowerCase();
        if (this.userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User exist!");
        }

        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setEmail(email);
        user.setRole(Role.USER);
        if (this.userRepository.findById(1L).isEmpty()) {
            user.setRole(Role.ADMIN);
        }
        this.userRepository.save(user);
        return this.loadUserByUsername(user.getEmail());
    }

    public void updateUser(User user) {

        user.setAccountNonLocked(user.getFailedAttempts() < Constants.MAX_FAILED_ATTEMPTS);
        this.userRepository.save(user);
    }

    public NewPasswordResponseDTO changePassword(String email, String newPassword) {
        User user = this.loadUserByUsername(email);
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The passwords must be different!");
        }

        user.setPassword(this.passwordEncoder.encode(newPassword));
        this.userRepository.save(user);
        return new NewPasswordResponseDTO(email);
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAllByOrderByIdAsc();
    }

    public void deleteByEmail(String email) {
        User userToDelete = this.loadUserByUsername(email);
        if (userToDelete.getRoles().contains(Role.ADMIN)) {
            throw new IncorrectRoleDeletionException();
        }
        this.userRepository.deleteById(userToDelete.getId());
    }

    public User updateRole(ChangeRoleDTO changes) {
        Role role = Arrays.stream(Role.values())
                .filter(r -> r.getRequestRepresentation().equals(changes.getRole()))
                .findAny()
                .orElseThrow(RoleNotFoundException::new);
        User user = this.loadUserByUsername(changes.getUser());
        if (changes.getOperation().equals("REMOVE")) {
            this.deleteRole(user, role);
        }
        else {
            this.grantRole(user, role);
        }
        return this.loadUserByUsername(user.getEmail());
    }

    private void deleteRole(User user, Role roleToDelete) {
        Set<Role> userRoles = user.getRoles();
        Role role = userRoles.stream()
                .filter(r -> r == roleToDelete)
                .findAny()
                .orElseThrow(NoSuchRoleForUser::new);
        if (userRoles.contains(Role.ADMIN)) {
            throw new IncorrectRoleDeletionException();
        }
        if (userRoles.size() == 1) {
            throw new LastRoleDeletionException();
        }
        userRoles.remove(role);
        this.userRepository.save(user);
    }

    private void grantRole(User user, Role roleToGrant) {
        Set<Role> userRoles = user.getRoles();
        if (roleToGrant.getGroup() == Group.ADMINISTRATIVE &&
                userRoles.stream().anyMatch(r -> r.getGroup() == Group.BUSINESS)) {
            throw new IncompatibleRolesException();
        }
        if (roleToGrant.getGroup() == Group.BUSINESS && userRoles.contains(Role.ADMIN)) {
            throw new IncompatibleRolesException();
        }
        userRoles.add(roleToGrant);
        this.userRepository.save(user);
    }

    public void lock(String email) {
        User user = loadUserByUsername(email);
        if (user.getRoles().contains(Role.ADMIN))
            throw new AdministratorLockException();
        user.setFailedAttempts(Constants.MAX_FAILED_ATTEMPTS + 1);
        this.updateUser(user);
    }

    public void unlock(String email) {
        User user = loadUserByUsername(email);
        user.setFailedAttempts(0);
        this.updateUser(user);
    }
}