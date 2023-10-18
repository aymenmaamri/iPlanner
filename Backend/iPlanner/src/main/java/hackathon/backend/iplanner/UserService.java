package hackathon.backend.iplanner;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {
    ArrayList<User> users;

    public UserService(){
        this.users = new ArrayList<>();
    }

    public User getUserById(String id){
        return users.stream().filter(user -> user.getId().equals(id)).findFirst().get();
    }

    public User getUserByUsername(String username){
        return users.stream().filter(user -> user.getName().equals(username)).findFirst().get();
    }

    public String getUsernameById(String id){
        return users.stream().filter(user -> user.getId().equals(id)).findFirst().get().getName();
    }


    public User createNewUser(String username){
        System.out.println(this.users + " user to create: " + username);
        boolean exists = users.stream().map(u -> u.getName()).anyMatch(name -> name.equals(username));
        if (exists) return null;
        User newUser = new User(username);
        users.add(newUser);
        return newUser;
    }

    public boolean userExists(String userId) {
        return users.stream().anyMatch(user -> user.getId().equals(userId));
    }
}
