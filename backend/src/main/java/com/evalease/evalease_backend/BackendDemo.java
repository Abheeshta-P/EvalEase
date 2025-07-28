package com.evalease.evalease_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendDemo {
    @GetMapping("/")
    public String home(){
        return "Hello kajal  piyyaaaa sakka ^0^";
    }
}
