package com.evalease.evalease_backend.repository;

import com.evalease.evalease_backend.entity.SubmittedForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubmittedFormRepository extends JpaRepository<SubmittedForm, Long> {
    @Query(value = "SELECT COUNT(*) FROM submitted_form WHERE submitted_at >= NOW()", nativeQuery = true)
    int countActiveSessionsLast30Minutes();
}
