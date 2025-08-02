package com.evalease.evalease_backend.controller;

import com.evalease.evalease_backend.dto.FormDTO;
import com.evalease.evalease_backend.entity.Form;
import com.evalease.evalease_backend.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.evalease.evalease_backend.repository.FormRepository; 
import com.evalease.evalease_backend.dto.FormSummaryDTO;

import java.util.List;

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
            System.out.println(savedForm);
            return ResponseEntity.ok(savedForm);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
    
    @Autowired
    private FormRepository formRepository;
    @GetMapping("/recent")
    public ResponseEntity<List<FormSummaryDTO>> getRecentForms() {
    List<Form> recentForms = formRepository.findTop5ByOrderByCreatedAtDesc();

    List<FormSummaryDTO> summaries = recentForms.stream()
        .map(form -> new FormSummaryDTO(form.getTitle(), form.getCreatedAt()))
        .toList();

    return ResponseEntity.ok(summaries);
}

}

