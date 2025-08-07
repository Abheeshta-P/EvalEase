package com.evalease.evalease_backend.repository;

import com.evalease.evalease_backend.entity.SubmittedForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmittedFormRepository extends JpaRepository<SubmittedForm, Long> {
}
