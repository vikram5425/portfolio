package com.vikram.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String duration;

    @Column(length = 2000)
    private String responsibilities;

    private String type; // Internship, Full-time, Part-time

    // Constructors
    public Experience() {}

    public Experience(String title, String company, String duration, String responsibilities, String type) {
        this.title = title;
        this.company = company;
        this.duration = duration;
        this.responsibilities = responsibilities;
        this.type = type;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
