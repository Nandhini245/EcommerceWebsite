package com.nanikavi.ecommerce;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users") //base path
public class UserApiController
{
@Autowired
private UserService userService;

//Register User
@PostMapping("/register")
public ResponseEntity<Map<String,String>>registerUser(@RequestBody User user)
{
	Map<String,String> response=new HashMap<>();
	
	if(userService.existsByEmail(user.getEmail()))
	{
		response.put("status", "error");
		response.put("message", "User already exists!");
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}
	
	userService.saveUser(user);
	response.put("status", "success");
	response.put("message", "Registered Successfully!");
	return ResponseEntity.ok(response);
}

//Login User
@PostMapping("/login")
public ResponseEntity<Map<String,String>> loginUser(@RequestBody User loginRequest)
{
	Map<String,String> response=new HashMap<>();
	User existingUser=userService.getUserByEmail(loginRequest.getEmail());
	
	if(existingUser==null)
	{
		response.put("status", "error");
		response.put("message", "User not found!");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	response.put("status", "success");
    response.put("message", "Login Successful!");
    response.put("name", existingUser.getName());
	return ResponseEntity.ok(response);
}
}
