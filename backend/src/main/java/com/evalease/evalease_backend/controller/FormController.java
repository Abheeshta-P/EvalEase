package com.evalease.evalease_backend.controller;

import com.evalease.evalease_backend.dto.FormDTO;
import com.evalease.evalease_backend.entity.Form;
import com.evalease.evalease_backend.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/forms")
@CrossOrigin(origins = "http://localhost:8081") // replace with your frontend port
public class FormController {

    @Autowired
    private FormService formService;

    @PostMapping
    public ResponseEntity<?> createForm(@RequestBody FormDTO formDTO) {
        try {
            Form savedForm = formService.saveForm(formDTO);
            return ResponseEntity.ok(savedForm);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
}
