package com.evalease.evalease_backend.dto;

import java.time.LocalDateTime;

public class FormSummaryDTO {
    private String title;
    private LocalDateTime createdAt;

    public FormSummaryDTO(String title, LocalDateTime createdAt) {
        this.title = title;
        this.createdAt = createdAt;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
