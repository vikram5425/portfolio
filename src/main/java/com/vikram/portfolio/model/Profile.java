package com.vikram.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String title;

    @Column(length = 2000)
    private String bio;

    private String imageUrl;

    private String email;

    private String phone;

    private String github;

    private String linkedin;

    private String resumeUrl;

    // Constructors
    public Profile() {}

    public Profile(String name, String title, String bio, String imageUrl, String email, String phone, String github, String linkedin, String resumeUrl) {
        this.name = name;
        this.title = title;
        this.bio = bio;
        this.imageUrl = imageUrl;
        this.email = email;
        this.phone = phone;
        this.github = github;
        this.linkedin = linkedin;
        this.resumeUrl = resumeUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
}
