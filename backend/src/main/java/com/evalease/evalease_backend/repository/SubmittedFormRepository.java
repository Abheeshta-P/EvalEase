package com.evalease.evalease_backend.repository;

import com.evalease.evalease_backend.entity.SubmittedForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

// public interface SubmittedFormRepository extends JpaRepository<SubmittedForm, Long> {
//     @Query(value = "SELECT COUNT(*) FROM submitted_form WHERE submitted_at >= NOW()", nativeQuery = true)
//     int countActiveSessionsLast30Minutes();
// }


public interface SubmittedFormRepository extends JpaRepository<SubmittedForm, Long> {

    
    @Query(value = "SELECT COUNT(*) FROM submitted_form WHERE submitted_at >= NOW()", nativeQuery = true)
     int countActiveSessionsLast30Minutes();

    @Query("SELECT sf FROM SubmittedForm sf WHERE sf.form.id = :formId")
   List<SubmittedForm>  findByFormId(@Param("formId") Long formId);
}
