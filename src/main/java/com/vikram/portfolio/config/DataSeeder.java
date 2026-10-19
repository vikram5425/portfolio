package com.vikram.portfolio.config;

import com.vikram.portfolio.model.Certificate;
import com.vikram.portfolio.model.Education;
import com.vikram.portfolio.model.Experience;
import com.vikram.portfolio.model.Profile;
import com.vikram.portfolio.model.Project;
import com.vikram.portfolio.model.Skill;
import com.vikram.portfolio.repository.CertificateRepository;
import com.vikram.portfolio.repository.EducationRepository;
import com.vikram.portfolio.repository.ExperienceRepository;
import com.vikram.portfolio.repository.ProfileRepository;
import com.vikram.portfolio.repository.ProjectRepository;
import com.vikram.portfolio.repository.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Seeds initial portfolio data asynchronously after ApplicationReadyEvent if tables are empty.
 * Idempotent: checks each repository before inserting to prevent duplicates
 * and preserve existing/updated records.
 * Non-blocking: executes on a background daemon executor so container startup
 * and health checks complete immediately without timeouts.
 */
@Component
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificateRepository certificateRepository;
    private final EducationRepository educationRepository;

    public DataSeeder(ProfileRepository profileRepository,
                      ProjectRepository projectRepository,
                      SkillRepository skillRepository,
                      ExperienceRepository experienceRepository,
                      CertificateRepository certificateRepository,
                      EducationRepository educationRepository) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.certificateRepository = certificateRepository;
        this.educationRepository = educationRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        ExecutorService executor = Executors.newSingleThreadExecutor(r -> {
            Thread thread = new Thread(r, "portfolio-data-seeder");
            thread.setDaemon(true);
            return thread;
        });

        executor.submit(() -> {
            try {
                seedAll();
            } catch (Throwable t) {
                log.error("Unexpected error during portfolio data seeding: {}", t.getMessage(), t);
            } finally {
                executor.shutdown();
            }
        });
    }

    private void seedAll() {
        log.info("Starting background portfolio data seeding...");
        try {
            seedProfile();
        } catch (Exception e) {
            log.error("Failed to seed profile: {}", e.getMessage(), e);
        }
        try {
            seedProjects();
        } catch (Exception e) {
            log.error("Failed to seed projects: {}", e.getMessage(), e);
        }
        try {
            seedSkills();
        } catch (Exception e) {
            log.error("Failed to seed skills: {}", e.getMessage(), e);
        }
        try {
            seedExperience();
        } catch (Exception e) {
            log.error("Failed to seed experience: {}", e.getMessage(), e);
        }
        try {
            seedCertificates();
        } catch (Exception e) {
            log.error("Failed to seed certificates: {}", e.getMessage(), e);
        }
        try {
            seedEducation();
        } catch (Exception e) {
            log.error("Failed to seed education: {}", e.getMessage(), e);
        }
        log.info("Background portfolio data seeding process finished.");
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = new Profile(
                "Vikram S",
                "Java Full Stack Developer",
                "Hi, I'm Vikram, a passionate Java Full Stack Developer specializing in Java, Spring Boot, Hibernate, JPA, SQL, and Web Technologies. I enjoy building scalable applications and solving real-world problems through code.",
                "",
                "vikramsaravanan12345@gmail.com",
                "+91 8754062289",
                "https://github.com/vikram5425",
                "https://www.linkedin.com/in/vikram-s-saravanan",
                "https://drive.google.com/file/d/1S00uyu5FM_OJJs9fdMMw68AGpxlVz6yQ/view?usp=drive_link"
            );
            profileRepository.save(profile);
            log.info("Seeded initial profile data.");
        } else {
            log.info("Profile table already contains data; skipping seeding.");
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            List<Project> projects = List.of(
                new Project(
                    "Student Management System",
                    "A comprehensive system for managing student records with full CRUD functionality and MySQL database integration.",
                    "Java, Spring Boot, MySQL, HTML, CSS, JavaScript",
                    "Add Students|Update Students|Delete Students|Search Students|MySQL Database Integration",
                    "",
                    "#",
                    "https://github.com/vikram/student-management-system"
                ),
                new Project(
                    "Student Grade Management System",
                    "An application for managing student grades with automated GPA calculation and performance analysis.",
                    "Java, JDBC, MySQL",
                    "Grade Calculation|GPA Calculation|Performance Analysis|Result Generation",
                    "",
                    "#",
                    "https://github.com/vikram/grade-management-system"
                )
            );
            projectRepository.saveAll(projects);
            log.info("Seeded initial projects data ({} records).", projects.size());
        } else {
            log.info("Projects table already contains data; skipping seeding.");
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = List.of(
                // Frontend
                new Skill("HTML", "Frontend", 90, "🌐"),
                new Skill("CSS", "Frontend", 70, "🎨"),
                new Skill("JavaScript", "Frontend", 50, "⚡"),
                new Skill("Bootstrap", "Frontend", 45, "📱"),

                // Backend
                new Skill("Java", "Backend", 92, "☕"),
                new Skill("Spring Boot", "Backend", 85, "🍃"),
                new Skill("Hibernate", "Backend", 80, "🔄"),
                new Skill("JPA", "Backend", 80, "📦"),

                // Database
                new Skill("MySQL", "Database", 88, "🗄️"),
                new Skill("SQL", "Database", 90, "📊"),

                // Tools
                new Skill("Git", "Tools", 85, "🔀"),
                new Skill("GitHub", "Tools", 88, "🐙"),
                new Skill("VS Code", "Tools", 90, "💻"),
                new Skill("Eclipse", "Tools", 82, "🌑"),
                new Skill("IntelliJ IDEA", "Tools", 80, "🧠")
            );
            skillRepository.saveAll(skills);
            log.info("Seeded initial skills data ({} records).", skills.size());
        } else {
            log.info("Skills table already contains data; skipping seeding.");
        }
    }

    private void seedExperience() {
        if (experienceRepository.count() == 0) {
            String responsibilities = "• Completed an intensive offline Java Full Stack program covering Spring Boot, REST API development, and frontend basics\n" +
                    "in a professional environment; organisation is AICTE-recognised and ISO 21001:2018 certified.\n" +
                    "• Gained hands-on exposure to full-stack project workflows, Git-based version control, and collaborative development";

            Experience exp = new Experience(
                "Java Full Stack Intern",
                "Edu Tantr (VDT Edu Tantr Ventures Pvt. Ltd.), Bengaluru",
                "3 Months",
                responsibilities,
                "Internship"
            );
            experienceRepository.save(exp);
            log.info("Seeded initial experience data.");
        } else {
            log.info("Experience table already contains data; skipping seeding.");
        }
    }

    private void seedCertificates() {
        if (certificateRepository.count() == 0) {
            List<Certificate> certificates = List.of(
                new Certificate("Java Certificate", "Cisco", "2024", "#", ""),
                new Certificate("Python Certificate", "Cisco", "2024", "#", ""),
                new Certificate("Programming in Java", "NPTEL", "2024", "#", ""),
                new Certificate("Problem Solving Certificate", "Skillrack", "2024", "#", ""),
                new Certificate("Java Developer Internship", "Tech Company", "2024", "#", "")
            );
            certificateRepository.saveAll(certificates);
            log.info("Seeded initial certificates data ({} records).", certificates.size());
        } else {
            log.info("Certificates table already contains data; skipping seeding.");
        }
    }

    private void seedEducation() {
        if (educationRepository.count() == 0) {
            Education edu = new Education(
                "B.Sc Computer Science",
                "Dr. SNS Rajalakshmi Arts and Science College",
                "8.4/10",
                "2027 (Expected)",
                "Pursuing Bachelor of Science in Computer Science with focus on Java Full Stack Development and Database Management."
            );
            educationRepository.save(edu);
            log.info("Seeded initial education data.");
        } else {
            log.info("Education table already contains data; skipping seeding.");
        }
    }
}
