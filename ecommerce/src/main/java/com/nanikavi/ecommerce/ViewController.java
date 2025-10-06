package com.nanikavi.ecommerce;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController 
{
	@GetMapping("/login")
    public String loginPage()
	{
        return "login";
    }
	
    @GetMapping("/register")
    public String registerPage()
    {
        return "register";
    }
    
    @GetMapping("/index")
    public String homePage()
    {
    	return "index";
    }
    
    @GetMapping("/cart")
    public String cartPage()
    {
    	return "cart";
    }

}
