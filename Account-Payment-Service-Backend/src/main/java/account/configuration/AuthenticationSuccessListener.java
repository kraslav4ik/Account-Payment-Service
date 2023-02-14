package account.configuration;

import account.entities.User;
import account.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        User user = this.userDetailsService.loadUserByUsername(event.getAuthentication().getName());
        user.setFailedAttempts(0);
        user.setLastFailed(false);
        this.userDetailsService.updateUser(user);
    }
}
