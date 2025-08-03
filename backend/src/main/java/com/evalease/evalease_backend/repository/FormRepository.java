package com.evalease.evalease_backend.repository;

import com.evalease.evalease_backend.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
    Optional<Form> findByTitle(String title);
    List<Form> findTop5ByOrderByCreatedAtDesc();
}