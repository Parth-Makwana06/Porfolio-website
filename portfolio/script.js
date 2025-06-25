document.addEventListener('DOMContentLoaded', function() {
    // Detect touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Improve hover effects for touch devices
        document.querySelectorAll('.skill-item, .project-card').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('hover-effect');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('hover-effect');
                }, 200);
            });
        });
    }

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        navLinks.classList.add('active');
        closeBtn.style.display = 'block';
        if (window.innerWidth <= 768) {
            body.style.overflow = 'hidden';
        }
    });

    closeBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
        closeBtn.style.display = 'none';
        body.style.overflow = '';
    });

    // Close menu when clicking on a link or outside
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            closeBtn.style.display = 'none';
            if (window.innerWidth <= 768) {
                body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger') && 
            e.target !== closeBtn) {
            navLinks.classList.remove('active');
            closeBtn.style.display = 'none';
            body.style.overflow = '';
        }
    });

    // Tech Canvas Animation
    const canvas = document.getElementById('techCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        // Tech-themed settings
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        const colors = ['#38bdf8', '#0ea5e9', '#7dd3fc']; // Blue tech colors

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        function animate() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Simple hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Typing animation
    const typed = new Typed('.typing', {
        strings: ['Software Developer', 'Web Developer', 'Tech Enthusiast', 'Fast Learner', 'Frontend Developer', 'Backend Developer', 'ICT Engineer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Project data
    const projects = [
        {
            title: 'Stock Management System',
            description: 'A Stock Market Simulation Platform built with PHP, MySQL, and modern front-end technologies.',
            tags: ['html5', 'css3', 'javascript', 'php', 'mysql'],
            codeLink: 'https://github.com/Parth-Makwana06/stock-management-system-.git',
            image: 'https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            title: 'Employee Leave Application',
            description: 'A productivity application for managing employee leave requests and approvals.',
            tags: ['html5', 'css3', 'javascript', 'php', 'mysql'],
            codeLink: 'https://github.com/Parth-Makwana06/Employee-Leave-Application-.git',
            image: 'https://www.hrmware.com/blog/wp-content/uploads/2021/04/Leave-Management-1-1024x519.jpg'
        },
        {
            title: 'Movie Ticket Booking System',
            description: 'A web application for booking movie tickets with showtimes, seat selection, and payment integration.',
            tags: ['python'],
            codeLink: 'https://github.com/Parth-Makwana06/Movie-Ticket-Booking-System-.git',
            image: 'https://miro.medium.com/max/1200/0*HknVQR_lvyXqKUaM.jpg'
        },
        {
            title: 'Stock Portfolio Tracker',
            description: 'Web application for tracking stock market investments and portfolio performance.',
            tags: ['Java'],
            codeLink: 'https://github.com/Parth-Makwana06/Stock-Portfolio-Tracker.git',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=2070&q=80'
        },
        {
            title: 'Gujarati Dhaba Management System',
            description: 'Dashboard for tracking restaurant orders, inventory, and order list.',
            tags: ['html5', 'css3', 'javascript', 'php', 'mysql'],
            codeLink: 'https://github.com/Parth-Makwana06/Gujarati-Dhaba-Management-System-.git',
            image: 'https://thearchitectsdiary.com/wp-content/uploads/2019/10/Amogh-11.jpg'
        },
        {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website to showcase projects and skills (this website).',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            codeLink: 'https://github.com/Parth-Makwana06/Porfolio-website.git',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1964&q=80'
        }
    ];

    // Render projects
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.codeLink}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Skills data with colors and animations
    const skills = [
        { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
        { name: 'Java', icon: 'fab fa-java', color: '#007396' },
        { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
        { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26' },
        { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
        { name: 'Web Development', icon: 'fas fa-code', color: '#61DAFB' },
        { name: 'Frontend Development', icon: 'fas fa-laptop-code', color: '#3A86FF' },
        { name: 'Backend Development', icon: 'fas fa-server', color: '#8338EC' },
        { name: 'Full-stack Development', icon: 'fas fa-layer-group', color: '#339933' },
        { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
        { name: 'Ruby', icon: 'fas fa-gem', color: '#CC342D' },
        { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
        { name: 'C/C++', icon: 'fas fa-c', color: '#A8B9CC' },
        { name: 'Leadership', icon: 'fas fa-users', color: '#FF6B6B' },
        { name: 'Teamwork', icon: 'fas fa-users-cog', color: '#4ECDC4' },
        { name: 'Problem Solving', icon: 'fas fa-lightbulb', color: '#FFD166' },
        { name: 'Microsoft Office', icon: 'fas fa-file-alt', color: '#D83B01' },
        { name: 'Programming', icon: 'fas fa-terminal', color: '#3A86FF' }
    ];

    // Render skills list with animations
    const skillsList = document.querySelector('.skills-list');

    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-icon" style="color: ${skill.color}">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-text">
                <h4>${skill.name}</h4>
            </div>
        `;
        
        // Add hover animation
        skillItem.addEventListener('mouseenter', () => {
            skillItem.style.transform = 'translateY(-5px)';
            skillItem.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.1), 0 0 15px ${skill.color}40`;
        });
        
        skillItem.addEventListener('mouseleave', () => {
            skillItem.style.transform = 'translateY(0)';
            skillItem.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Staggered animation
        skillItem.style.animationDelay = `${index * 0.1}s`;
        
        skillsList.appendChild(skillItem);
    });

    // Animate skills on scroll
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    };

    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Education data
    const education = [
        {
            items: [
                {
                    degree: "Diploma In Information And Communication Technology",
                    institution: "A.V.Parekh Technical Institute, Rajkot | GTU",
                    duration: "2023 To 2026 July",
                    image: "https://tse1.mm.bing.net/th?id=OIP.7SLX-ZqFzz7mHd0pVks8oAHaE8&pid=Api&P=0&h=180"
                },
                {
                    degree: "SSC | General Stream",
                    institution: "Aditya Birla Higher Secondary School, Veraval | GSEB",
                    duration: "Completed Year",
                    image: "https://adityabirlaschools.co.in/abhss-veraval/wp-content/uploads/sites/37/2022/07/School-Garden-Temple-1024x768.jpg"
                }
            ]
        }
    ];

    // Render education
    const educationTimeline = document.querySelector('.education-timeline');

    education.forEach(edu => {
        edu.items.forEach((item, index) => {
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            
            educationItem.innerHTML = `
                <div class="education-content">
                    <img src="${item.image}" alt="${item.institution}" class="education-img">
                    <div class="education-text">
                        <h3>${item.degree}</h3>
                        <p class="institution">${item.institution}</p>
                        <p class="duration">${item.duration}</p>
                    </div>
                </div>
            `;
            
            educationTimeline.appendChild(educationItem);
        });
    });

    // Experience data
    const experiences = [
        {
            position: "Mysql Bootcamp",
            company: "ITM Edutech Training Pvt. Ltd. ",
            duration: "16 April to 18 April 2025",
            description: "I Sucessfully Completed Mysql bootcamp from GDG MAD, N.S.D.C. (National skill development copration).",
            skills: ["Mysql","bootcamp"]
        },
        {
            position: "Semiconductor Design & Development",
            company: "E Info-chip",
            duration: "27 January To 29th January 2025",
            description: "I Sucessfully completed a 3-days workshop on <b>semiconductor Design & Development</b> held on A.V. Parekh Technical Institute, Rajkot by DIC Spoke center Rajkot.",
            skills: ["semiconductor","VLSI","C/C++"]
        },
        {
            position: "Python Bootcamp",
            company: "ITM Edutech Training Pvt. Ltd.",
            duration: "21 May To 23 May 2025",
            description: "I Sucessfully completed Python bootcamp from GDG MAD, N.S.D.C. (National skill development copration).",
            skills: ["Python", "Bootcamp"]
        }
    ];

    // Render experience
    const experienceTimeline = document.querySelector('.experience-timeline');

    experiences.forEach((exp, index) => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        experienceItem.innerHTML = `
            <div class="experience-content">
                <h3>${exp.position}</h3>
                <p class="experience-company">${exp.company}</p>
                <p class="experience-duration">${exp.duration}</p>
                <p class="experience-description">${exp.description}</p>
                <div class="experience-skills">
                    ${exp.skills.map(skill => `<span class="experience-skill">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        experienceTimeline.appendChild(experienceItem);
    });

    // Form submission with Formspree (free service)
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Change button text to show loading state
        const originalButtonText = submitButton.innerHTML;
        if (window.innerWidth <= 768) {
            submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        } else {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        submitButton.disabled = true;
        
        try {
            // Send data to Formspree
            const response = await fetch('https://formspree.io/f/xkgbqevw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                // Handle errors
                const errorData = await response.json();
                if (errorData.errors) {
                    const errorMessage = errorData.errors.map(error => error.message).join(', ');
                    alert('There was an error: ' + errorMessage);
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again later.');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});