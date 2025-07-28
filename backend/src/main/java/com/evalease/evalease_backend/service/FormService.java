package com.evalease.evalease_backend.service;

import com.evalease.evalease_backend.dto.FormDTO;
import com.evalease.evalease_backend.entity.Form;
import com.evalease.evalease_backend.entity.OptionItem;
import com.evalease.evalease_backend.entity.Question;
import com.evalease.evalease_backend.repository.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormService {

    @Autowired
    private FormRepository formRepository;

    public Form saveForm(FormDTO dto) {
        Form form = new Form();
        form.setTitle(dto.title);
        form.setDescription(dto.description);
        form.setCreatedAt(Instant.parse(dto.createdAt));

        List<Question> questions = new ArrayList<>();

        for (FormDTO.QuestionDTO q : dto.questions) {
            Question question = new Question();
            question.setTitle(q.title);
            question.setType(q.type);
            question.setRequired(q.required);
            question.setRatingScale(q.ratingScale);
            question.setForm(form); // Link back to parent form

            // Convert options from string list to OptionItem list
            if (q.options != null && !q.options.isEmpty()) {
                List<OptionItem> optionItems = q.options.stream()
                        .map(opt -> OptionItem.builder()
                                .value(opt)
                                .question(question)
                                .build())
                        .collect(Collectors.toList());
                question.setOptions(optionItems);
            }

            questions.add(question);
        }

        form.setQuestions(questions);
        return formRepository.save(form);
    }
}
