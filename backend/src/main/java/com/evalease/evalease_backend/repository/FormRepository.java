package com.evalease.evalease_backend.repository;

// import com.evalease.evalease_backend.entity.Form;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.Optional;

// public interface FormRepository extends JpaRepository<Form, Long> {
//     Optional<Form> findByTitle(String title);
// }
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.evalease.evalease_backend.entity.Form;

public interface FormRepository extends JpaRepository<Form, Long> {

    @Query("SELECT DISTINCT f FROM Form f " +
            "LEFT JOIN FETCH f.questions q " +
            "LEFT JOIN FETCH q.options " +
            "WHERE f.id = :id")
    Optional<Form> findFormWithQuestionsAndOptions(@Param("id") Long id);
}
