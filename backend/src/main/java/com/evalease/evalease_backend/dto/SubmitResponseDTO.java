// package com.evalease.evalease_backend.dto;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// import java.util.Map;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class SubmitResponseDTO {
//     private Long formId;
//     private Long employeeId;
//     private Map<Long, Object> responses; // Key: questionId, Value: answer (String / Array)
//     private String submittedAt;
// }
package com.evalease.evalease_backend.dto;

import lombok.Data;
import java.util.Map;

@Data
public class SubmitResponseDTO {
    private Long formId;
    private Long employeeId;
    private Map<String, Object> responses; // <--- Keep keys as String
}
