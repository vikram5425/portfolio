package com.vikram.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category; // Frontend, Backend, Database, Tools

    private int proficiency; // 0-100

    private String icon;

    // Constructors
    public Skill() {}

    public Skill(String name, String category, int proficiency, String icon) {
        this.name = name;
        this.category = category;
        this.proficiency = proficiency;
        this.icon = icon;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getProficiency() { return proficiency; }
    public void setProficiency(int proficiency) { this.proficiency = proficiency; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
