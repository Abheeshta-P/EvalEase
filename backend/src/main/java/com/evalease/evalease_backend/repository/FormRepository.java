package com.evalease.evalease_backend.repository;

import com.evalease.evalease_backend.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormRepository extends JpaRepository<Form, Long> {
    Optional<Form> findByTitle(String title);
}
