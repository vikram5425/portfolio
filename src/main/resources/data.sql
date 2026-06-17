-- ==========================================
-- Vikram Portfolio - Seed Data
-- ==========================================

-- Profile
INSERT INTO profile (name, title, bio, image_url, email, phone, github, linkedin, resume_url) VALUES (
    'Vikram S',
    'Java Full Stack Developer',
    'Hi, I''m Vikram, a passionate Java Full Stack Developer specializing in Java, Spring Boot, Hibernate, JPA, SQL, and Web Technologies. I enjoy building scalable applications and solving real-world problems through code.',
    '',
    'vikramsaravanan12345@gmail.com',
    '+91 8754062289',
    'https://github.com/vikram5425',
    'https://www.linkedin.com/in/vikram-s-saravanan',
    'https://drive.google.com/file/d/1S00uyu5FM_OJJs9fdMMw68AGpxlVz6yQ/view?usp=drive_link'
);

-- Projects
INSERT INTO projects (title, description, tech_stack, features, image_url, live_url, github_url) VALUES (
    'Student Management System',
    'A comprehensive system for managing student records with full CRUD functionality and MySQL database integration.',
    'Java, Spring Boot, MySQL, HTML, CSS, JavaScript',
    'Add Students|Update Students|Delete Students|Search Students|MySQL Database Integration',
    '',
    '#',
    'https://github.com/vikram/student-management-system'
);

INSERT INTO projects (title, description, tech_stack, features, image_url, live_url, github_url) VALUES (
    'Student Grade Management System',
    'An application for managing student grades with automated GPA calculation and performance analysis.',
    'Java, JDBC, MySQL',
    'Grade Calculation|GPA Calculation|Performance Analysis|Result Generation',
    '',
    '#',
    'https://github.com/vikram/grade-management-system'
);

-- Skills - Frontend
INSERT INTO skills (name, category, proficiency, icon) VALUES ('HTML', 'Frontend', 90, '🌐');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('CSS', 'Frontend', 70, '🎨');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('JavaScript', 'Frontend', 50, '⚡');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Bootstrap', 'Frontend', 45, '📱');

-- Skills - Backend
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Java', 'Backend', 92, '☕');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Spring Boot', 'Backend', 85, '🍃');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Hibernate', 'Backend', 80, '🔄');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('JPA', 'Backend', 80, '📦');

-- Skills - Database
INSERT INTO skills (name, category, proficiency, icon) VALUES ('MySQL', 'Database', 88, '🗄️');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('SQL', 'Database', 90, '📊');

-- Skills - Tools
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Git', 'Tools', 85, '🔀');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('GitHub', 'Tools', 88, '🐙');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('VS Code', 'Tools', 90, '💻');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('Eclipse', 'Tools', 82, '🌑');
INSERT INTO skills (name, category, proficiency, icon) VALUES ('IntelliJ IDEA', 'Tools', 80, '🧠');

-- Experience
INSERT INTO experiences (title, company, duration, responsibilities, type) VALUES (
    'Java Full Stack Intern',
    'Edu Tantr (VDT Edu Tantr Ventures Pvt. Ltd.), Bengaluru',
    '3 Months',
    '• Completed an intensive offline Java Full Stack program covering Spring Boot, REST API development, and frontend basics
in a professional environment; organisation is AICTE-recognised and ISO 21001:2018 certified.
• Gained hands-on exposure to full-stack project workflows, Git-based version control, and collaborative development',
    'Internship'
);

-- Certificates
INSERT INTO certificates (title, issuer, date, credential_url, image_url) VALUES ('Java Certificate', 'Cisco', '2024', '#', '');
INSERT INTO certificates (title, issuer, date, credential_url, image_url) VALUES ('Python Certificate', 'Cisco', '2024', '#', '');
INSERT INTO certificates (title, issuer, date, credential_url, image_url) VALUES ('Programming in Java', 'NPTEL', '2024', '#', '');
INSERT INTO certificates (title, issuer, date, credential_url, image_url) VALUES ('Problem Solving Certificate', 'Skillrack', '2024', '#', '');
INSERT INTO certificates (title, issuer, date, credential_url, image_url) VALUES ('Java Developer Internship', 'Tech Company', '2024', '#', '');

-- Education
INSERT INTO education (degree, institution, cgpa, graduation_year, description) VALUES (
    'B.Sc Computer Science',
    'Dr. SNS Rajalakshmi Arts and Science College',
    '8.4/10',
    '2027 (Expected)',
    'Pursuing Bachelor of Science in Computer Science with focus on Java Full Stack Development and Database Management.'
);
