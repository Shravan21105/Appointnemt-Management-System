package com.shravan.backend.controller;


import com.shravan.backend.dto.AuthRequest;
import com.shravan.backend.security.JwtUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request){
        if(request.getUsername().equals("admin") && request.getPassword().equals("admin123")){
            return jwtUtil.generateToken(request.getUsername(), "ADMIN");
        }
        return "Invalid Credentials";
    }
}
