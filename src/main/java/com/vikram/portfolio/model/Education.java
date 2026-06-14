package com.vikram.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;

    private String institution;

    private String cgpa;

    private String graduationYear;

    @Column(length = 1000)
    private String description;

    // Constructors
    public Education() {}

    public Education(String degree, String institution, String cgpa, String graduationYear, String description) {
        this.degree = degree;
        this.institution = institution;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getCgpa() { return cgpa; }
    public void setCgpa(String cgpa) { this.cgpa = cgpa; }

    public String getGraduationYear() { return graduationYear; }
    public void setGraduationYear(String graduationYear) { this.graduationYear = graduationYear; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
