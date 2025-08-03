package com.evalease.evalease_backend.dto;
import java.time.LocalDateTime;
import java.util.List;

public class FormDTO {
    public String title;
    public String description;
    private LocalDateTime createdAt;
    public List<QuestionDTO> questions;

    public static class QuestionDTO {
        public String type;
        public String title;
        public boolean required;
        public List<String> options;
        public Integer ratingScale;
    }
}