/* ==========================================
   Vikram Portfolio - Main JavaScript
   ========================================== */

const API_BASE = '';

// ==========================================
// DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypewriter();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    loadPortfolioData();
});

// ==========================================
// Load All Portfolio Data from API
// ==========================================
async function loadPortfolioData() {
    try {
        const [profile, projects, skills, experience, certificates, education] = await Promise.all([
            fetchData('/api/profile'),
            fetchData('/api/projects'),
            fetchData('/api/skills'),
            fetchData('/api/experience'),
            fetchData('/api/certificates'),
            fetchData('/api/education')
        ]);

        if (profile) renderProfile(profile);
        if (projects) renderProjects(projects);
        if (skills) renderSkills(skills);
        if (experience) renderExperience(experience);
        if (certificates) renderCertificates(certificates);
        if (education) renderEducation(education);

    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

async function fetchData(endpoint) {
    try {
        const response = await fetch(API_BASE + endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

// ==========================================
// Render Profile
// ==========================================
function renderProfile(profile) {
    // Hero section
    const heroBio = document.getElementById('heroBio');
    if (heroBio && profile.bio) heroBio.textContent = profile.bio;

    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn && profile.resumeUrl) resumeBtn.href = profile.resumeUrl;

    // Social links
    const socialLinks = {
        'heroGithub': profile.github,
        'heroLinkedin': profile.linkedin,
        'heroEmail': profile.email ? `mailto:${profile.email}` : null,
        'footerGithub': profile.github,
        'footerLinkedin': profile.linkedin,
    };

    Object.entries(socialLinks).forEach(([id, url]) => {
        const el = document.getElementById(id);
        if (el && url) el.href = url;
    });

    // About section
    const aboutName = document.getElementById('aboutName');
    if (aboutName && profile.name) aboutName.textContent = profile.name;

    const aboutEmail = document.getElementById('aboutEmail');
    if (aboutEmail && profile.email) aboutEmail.textContent = profile.email;

    // Contact section
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail && profile.email) contactEmail.textContent = profile.email;

    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone && profile.phone) contactPhone.textContent = profile.phone;

    const contactGithub = document.getElementById('contactGithub');
    if (contactGithub && profile.github) {
        contactGithub.href = profile.github;
        contactGithub.textContent = profile.github.replace('https://', '');
    }

    const contactLinkedin = document.getElementById('contactLinkedin');
    if (contactLinkedin && profile.linkedin) {
        contactLinkedin.href = profile.linkedin;
        contactLinkedin.textContent = profile.linkedin.replace('https://', '');
    }
}

// ==========================================
// Render Projects
// ==========================================
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = projects.map((project, index) => {
        const features = project.features ? project.features.split('|') : [];
        const techStack = project.techStack ? project.techStack.split(',').map(t => t.trim()) : [];
        const icons = ['💻', '📊', '🚀', '🛠️', '📱', '🎮'];

        return `
            <div class="project-card fade-in" style="transition-delay: ${index * 0.1}s">
                <div class="project-image">
                    ${icons[index % icons.length]}
                </div>
                <div class="project-body">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${features.length ? `
                        <div class="project-features">
                            ${features.map(f => `<span class="feature-tag">${f.trim()}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="project-tech">
                        ${techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.liveUrl && project.liveUrl !== '#' ? `
                            <a href="${project.liveUrl}" class="btn btn-sm btn-primary" target="_blank">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                Live Demo
                            </a>
                        ` : ''}
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" class="btn btn-sm btn-outline" target="_blank">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                                GitHub
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Re-init scroll animations for new elements
    initScrollAnimations();
}

// ==========================================
// Render Skills
// ==========================================
function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    const categories = {};
    const categoryIcons = {
        'Frontend': '🌐',
        'Backend': '⚙️',
        'Database': '🗄️',
        'Tools': '🛠️'
    };
    const categoryOrder = ['Frontend', 'Backend', 'Database', 'Tools'];

    skills.forEach(skill => {
        if (!categories[skill.category]) {
            categories[skill.category] = [];
        }
        categories[skill.category].push(skill);
    });

    container.innerHTML = categoryOrder
        .filter(cat => categories[cat])
        .map((category, index) => `
            <div class="skill-category fade-in" style="transition-delay: ${index * 0.15}s">
                <div class="skill-category-header">
                    <div class="skill-category-icon">${categoryIcons[category] || '📦'}</div>
                    <h3 class="skill-category-title">${category}</h3>
                </div>
                <div class="skill-items">
                    ${categories[category].map(skill => `
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">${skill.icon || ''} ${skill.name}</span>
                                <span class="skill-percent">${skill.proficiency}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" data-width="${skill.proficiency}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

    initScrollAnimations();
}

// ==========================================
// Render Experience
// ==========================================
function renderExperience(experiences) {
    const container = document.getElementById('experienceContainer');
    if (!container) return;

    container.innerHTML = experiences.map((exp, index) => {
        const responsibilities = exp.responsibilities ? exp.responsibilities.split('|') : [];

        return `
            <div class="timeline-item fade-in" style="transition-delay: ${index * 0.15}s">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-type">${exp.type || 'Experience'}</span>
                    <h3 class="timeline-title">${exp.title}</h3>
                    <p class="timeline-company">${exp.company}</p>
                    <p class="timeline-duration">${exp.duration}</p>
                    ${responsibilities.length ? `
                        <ul class="timeline-responsibilities">
                            ${responsibilities.map(r => `<li>${r.trim()}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    initScrollAnimations();
}

// ==========================================
// Render Certificates
// ==========================================
function renderCertificates(certificates) {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;

    const issuerIcons = {
        'Cisco': '🏛️',
        'NPTEL': '🎓',
        'Skillrack': '🏆',
        'Tech Company': '💼'
    };

    container.innerHTML = certificates.map((cert, index) => `
        <div class="certificate-card fade-in" style="transition-delay: ${index * 0.1}s">
            <div class="certificate-icon">${issuerIcons[cert.issuer] || '📜'}</div>
            <h3 class="certificate-title">${cert.title}</h3>
            <p class="certificate-issuer">${cert.issuer}</p>
            <p class="certificate-date">${cert.date}</p>
            ${cert.credentialUrl && cert.credentialUrl !== '#' ? `
                <a href="${cert.credentialUrl}" class="certificate-link" target="_blank">View Credential →</a>
            ` : ''}
        </div>
    `).join('');

    initScrollAnimations();
}

// ==========================================
// Render Education
// ==========================================
function renderEducation(educationList) {
    const container = document.getElementById('educationContainer');
    if (!container) return;

    container.innerHTML = educationList.map((edu, index) => `
        <div class="education-card fade-in" style="transition-delay: ${index * 0.15}s">
            <h3 class="education-degree">${edu.degree}</h3>
            <p class="education-institution">${edu.institution}</p>
            <div class="education-details">
                <div class="education-detail">
                    <span class="education-detail-label">CGPA:</span>
                    <span class="education-detail-value">${edu.cgpa}</span>
                </div>
                <div class="education-detail">
                    <span class="education-detail-label">Graduation:</span>
                    <span class="education-detail-value">${edu.graduationYear}</span>
                </div>
            </div>
            ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
        </div>
    `).join('');

    // Update About section with education data
    if (educationList.length > 0) {
        const edu = educationList[0];
        const aboutDegree = document.getElementById('aboutDegree');
        if (aboutDegree) aboutDegree.textContent = edu.degree;

        const aboutCollege = document.getElementById('aboutCollege');
        if (aboutCollege) aboutCollege.textContent = edu.institution;

        const aboutCgpa = document.getElementById('aboutCgpa');
        if (aboutCgpa) aboutCgpa.textContent = edu.cgpa;

        const aboutGradYear = document.getElementById('aboutGradYear');
        if (aboutGradYear) aboutGradYear.textContent = edu.graduationYear;
    }

    initScrollAnimations();
}

// ==========================================
// Typewriter Effect
// ==========================================
function initTypewriter() {
    const titles = [
        'Java Full Stack Developer',
        'Spring Boot Developer',
        'Backend Developer',
        'Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const el = document.getElementById('typewriter');
    if (!el) return;

    function type() {
        const current = titles[titleIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// ==========================================
// Particles Background
// ==========================================
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;

        const colors = ['#4f8fff', '#8b5cf6', '#00d4ff', '#ec4899'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars
                const skillBars = entry.target.querySelectorAll('.skill-fill');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    }
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// Contact Form
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('formName').value,
            email: document.getElementById('formEmail').value,
            subject: document.getElementById('formSubject').value,
            message: document.getElementById('formMessage').value
        };

        try {
            const response = await fetch(API_BASE + '/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showToast('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error. Please try again later.', 'error');
        }
    });
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
