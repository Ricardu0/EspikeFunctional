package br.com.project.espike.controller;

import br.com.project.espike.model.User;
import br.com.project.espike.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ClientController {
    //service

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String hello_world() {
        return "Hello World!";
    }

    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userService.addUser(user);
        return "User added successfully!";
    }
        //getPatientById
    @RequestMapping("/user/{id}")
    public User findUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);

    }
    //getUsers
    @RequestMapping("/users")
    public List<User> findAllUsers() {
        return userService.getUsers();
    }

    @PutMapping("/user")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    //deleteUserById
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "User deleted successfully!";
    }
}
