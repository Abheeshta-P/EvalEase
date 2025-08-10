package com.evalease.evalease_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.Instant;

public class FormSummaryDTO {
    private String title;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant createdAt;

    public FormSummaryDTO() {} // Required for Jackson

    public FormSummaryDTO(String title, Instant createdAt) {
        this.title = title;
        this.createdAt = createdAt;
    }

    public String getTitle() {
        return title;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
