package com.nanikavi.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService 
{

@Autowired
private UserRepository userRepository;
	
//existByEmail
public boolean existsByEmail(String email)
{
	return userRepository.existsByEmail(email);
}

//findByEmail
public User getUserByEmail(String email)
{
	return userRepository.findByEmail(email);
}

//saveUser
public void saveUser(User user)
{
	userRepository.save(user);
}
}

