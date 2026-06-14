package com.vikram.portfolio.controller;

import com.vikram.portfolio.model.Education;
import com.vikram.portfolio.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "*")
public class EducationController {

    @Autowired
    private EducationRepository educationRepository;

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @GetMapping
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education details) {
        return educationRepository.findById(id)
                .map(edu -> {
                    edu.setDegree(details.getDegree());
                    edu.setInstitution(details.getInstitution());
                    edu.setCgpa(details.getCgpa());
                    edu.setGraduationYear(details.getGraduationYear());
                    edu.setDescription(details.getDescription());
                    return ResponseEntity.ok(educationRepository.save(edu));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(edu -> {
                    educationRepository.delete(edu);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
