/* ==========================================
   Vikram Portfolio - Embedded Data
   All portfolio data is stored here instead of a backend API.
   To update your portfolio, just edit this file!
   ========================================== */

const PORTFOLIO_DATA = {

    // ==========================================
    // Profile Information
    // ==========================================
    profile: {
        name: 'Vikram S',
        title: 'Java Full Stack Developer',
        bio: "Hi, I'm Vikram, a passionate Java Full Stack Developer specializing in Java, Spring Boot, Hibernate, JPA, SQL, and Web Technologies. I enjoy building scalable applications and solving real-world problems through code.",
        imageUrl: '',
        email: 'vikram@example.com',
        phone: '+91 9876543210',
        github: 'https://github.com/vikram',
        linkedin: 'https://linkedin.com/in/vikram',
        resumeUrl: '#'
    },

    // ==========================================
    // Projects
    // ==========================================
    projects: [
        {
            id: 1,
            title: 'Student Management System',
            description: 'A comprehensive system for managing student records with full CRUD functionality and MySQL database integration.',
            techStack: 'Java, Spring Boot, MySQL, HTML, CSS, JavaScript',
            features: 'Add Students|Update Students|Delete Students|Search Students|MySQL Database Integration',
            imageUrl: '',
            liveUrl: '#',
            githubUrl: 'https://github.com/vikram/student-management-system'
        },
        {
            id: 2,
            title: 'Student Grade Management System',
            description: 'An application for managing student grades with automated GPA calculation and performance analysis.',
            techStack: 'Java, JDBC, MySQL',
            features: 'Grade Calculation|GPA Calculation|Performance Analysis|Result Generation',
            imageUrl: '',
            liveUrl: '#',
            githubUrl: 'https://github.com/vikram/grade-management-system'
        }
    ],

    // ==========================================
    // Skills
    // ==========================================
    skills: [
        // Frontend
        { id: 1, name: 'HTML', category: 'Frontend', proficiency: 90, icon: '🌐' },
        { id: 2, name: 'CSS', category: 'Frontend', proficiency: 85, icon: '🎨' },
        { id: 3, name: 'JavaScript', category: 'Frontend', proficiency: 80, icon: '⚡' },
        { id: 4, name: 'Bootstrap', category: 'Frontend', proficiency: 75, icon: '📱' },
        // Backend
        { id: 5, name: 'Java', category: 'Backend', proficiency: 92, icon: '☕' },
        { id: 6, name: 'Spring Boot', category: 'Backend', proficiency: 85, icon: '🍃' },
        { id: 7, name: 'Hibernate', category: 'Backend', proficiency: 80, icon: '🔄' },
        { id: 8, name: 'JPA', category: 'Backend', proficiency: 80, icon: '📦' },
        // Database
        { id: 9, name: 'MySQL', category: 'Database', proficiency: 88, icon: '🗄️' },
        { id: 10, name: 'SQL', category: 'Database', proficiency: 90, icon: '📊' },
        // Tools
        { id: 11, name: 'Git', category: 'Tools', proficiency: 85, icon: '🔀' },
        { id: 12, name: 'GitHub', category: 'Tools', proficiency: 88, icon: '🐙' },
        { id: 13, name: 'VS Code', category: 'Tools', proficiency: 90, icon: '💻' },
        { id: 14, name: 'Eclipse', category: 'Tools', proficiency: 82, icon: '🌑' },
        { id: 15, name: 'IntelliJ IDEA', category: 'Tools', proficiency: 80, icon: '🧠' }
    ],

    // ==========================================
    // Experience
    // ==========================================
    experience: [
        {
            id: 1,
            title: 'Java Developer Intern',
            company: 'Tech Company',
            duration: '3 Months',
            responsibilities: 'Developed Java applications|Worked with SQL databases|Debugged and tested applications|Collaborated with development team',
            type: 'Internship'
        }
    ],

    // ==========================================
    // Certificates
    // ==========================================
    certificates: [
        { id: 1, title: 'Java Certificate', issuer: 'Cisco', date: '2024', credentialUrl: '#', imageUrl: '' },
        { id: 2, title: 'Python Certificate', issuer: 'Cisco', date: '2024', credentialUrl: '#', imageUrl: '' },
        { id: 3, title: 'Programming in Java', issuer: 'NPTEL', date: '2024', credentialUrl: '#', imageUrl: '' },
        { id: 4, title: 'Problem Solving Certificate', issuer: 'Skillrack', date: '2024', credentialUrl: '#', imageUrl: '' },
        { id: 5, title: 'Java Developer Internship', issuer: 'Tech Company', date: '2024', credentialUrl: '#', imageUrl: '' }
    ],

    // ==========================================
    // Education
    // ==========================================
    education: [
        {
            id: 1,
            degree: 'B.Sc Computer Science',
            institution: 'Dr. SNS Rajalakshmi Arts and Science College',
            cgpa: '8.9/10',
            graduationYear: '2027 (Expected)',
            description: 'Pursuing Bachelor of Science in Computer Science with focus on Java Full Stack Development and Database Management.'
        }
    ]
};
