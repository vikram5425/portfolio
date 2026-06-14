package com.vikram.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String techStack;

    private String imageUrl;

    private String liveUrl;

    private String githubUrl;

    @Column(length = 2000)
    private String features;

    // Constructors
    public Project() {}

    public Project(String title, String description, String techStack, String features, String imageUrl, String liveUrl, String githubUrl) {
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.features = features;
        this.imageUrl = imageUrl;
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}
