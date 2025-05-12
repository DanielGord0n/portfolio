import React, { useEffect, useRef } from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const sectionRefs = {
    mainSkills: useRef(null),
    skillBars: useRef(null),
    workProcess: useRef(null),
    additionalSkills: useRef(null)
  };

  // Animation for sections on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.20,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
          <line x1="12" y1="22" x2="12" y2="15.5"></line>
          <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
        </svg>
      ),
      description: 'Building responsive, intuitive user interfaces with modern frameworks and tools.',
      skills: [
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'React.js', level: 90 },
        { name: 'HTML5/CSS3', level: 92 },
        { name: 'Redux', level: 85 },
        { name: 'Responsive Design', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'SASS/LESS', level: 80 },
        { name: 'Bootstrap/Material UI', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      description: 'Creating robust, scalable server-side applications and APIs.',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 90 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'GraphQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'Authentication/Security', level: 80 },
        { name: 'Serverless Architecture', level: 75 }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="20" y2="9"></line>
          <line x1="4" y1="15" x2="20" y2="15"></line>
          <line x1="10" y1="3" x2="8" y2="21"></line>
          <line x1="16" y1="3" x2="14" y2="21"></line>
        </svg>
      ),
      description: 'Automating deployment and ensuring seamless integration across platforms.',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD Pipelines', level: 70 },
        { name: 'AWS Services', level: 70 },
        { name: 'Testing (Jest, Mocha)', level: 80 },
        { name: 'Webpack/Babel', level: 75 },
        { name: 'Linux', level: 70 },
        { name: 'Agile Methodology', level: 85 }
      ]
    }
  ];
  
  // Work process/methodology
  const workProcess = [
    {
      title: 'Research & Planning',
      description: 'I begin by thoroughly understanding project requirements and researching best approaches.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      title: 'Design & Architecture',
      description: 'Next, I create a solid architecture design that ensures scalability and maintainability.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      )
    },
    {
      title: 'Development',
      description: 'During development, I follow best practices for clean, maintainable, and well-documented code.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      title: 'Testing & Optimization',
      description: 'Rigorous testing and performance optimization to ensure a smooth, bug-free experience.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="skills-page">
      {/* Main Skills Header Section */}
      <div className="skills-header" ref={sectionRefs.mainSkills}>
        <h1>My Technical Skills</h1>
        <p className="skills-intro">
          As a Full Stack Developer, I've cultivated a diverse set of technical skills
          through both professional experience and personal projects. I'm committed to
          continuous learning and staying current with the latest technologies.
        </p>
        <div className="skills-overview">
          <div className="skill-highlight">
            <div className="highlight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <h3>5+ Years</h3>
            <p>Professional Experience</p>
          </div>
          <div className="skill-highlight">
            <div className="highlight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>30+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="skill-highlight">
            <div className="highlight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3>3</h3>
            <p>Technical Certifications</p>
          </div>
        </div>
      </div>

      {/* Skill Categories with Progress Bars */}
      <div className="skills-content" ref={sectionRefs.skillBars}>
        {skillCategories.map((category, index) => (
          <div className="skill-section" key={index}>
            <div className="skill-section-header">
              <div className="skill-icon">{category.icon}</div>
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </div>
            <div className="skill-bars">
              {category.skills.map((skill, idx) => (
                <div className="skill-item" key={idx}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Work Process Section */}
      <div className="work-process-section" ref={sectionRefs.workProcess}>
        <h2>My Development Process</h2>
        <p className="section-intro">I follow a systematic approach to ensure high-quality deliverables</p>
        
        <div className="process-steps">
          {workProcess.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Skills Grid */}
      <div className="additional-skills" ref={sectionRefs.additionalSkills}>
        <h2>Additional Skills & Expertise</h2>
        <div className="additional-grid">
          <div className="additional-card">
            <h3>Soft Skills</h3>
            <ul>
              <li>Project Management</li>
              <li>Team Leadership</li>
              <li>Problem Solving</li>
              <li>Technical Documentation</li>
              <li>Client Communication</li>
              <li>Mentoring Junior Developers</li>
              <li>Agile Methodology</li>
              <li>Time Management</li>
            </ul>
          </div>
          <div className="additional-card">
            <h3>Familiar Technologies</h3>
            <ul>
              <li>Vue.js</li>
              <li>Next.js</li>
              <li>Python</li>
              <li>Firebase</li>
              <li>Jenkins</li>
              <li>Styled Components</li>
              <li>Tailwind CSS</li>
              <li>Socket.IO</li>
            </ul>
          </div>
          <div className="additional-card">
            <h3>Currently Learning</h3>
            <ul>
              <li>React Native</li>
              <li>Kubernetes</li>
              <li>Microservices Architecture</li>
              <li>Terraform</li>
              <li>Web3 Development</li>
              <li>Machine Learning Basics</li>
              <li>Three.js</li>
              <li>Advanced CI/CD Practices</li>
            </ul>
          </div>
          <div className="additional-card">
            <h3>Development Tools</h3>
            <ul>
              <li>VS Code</li>
              <li>GitHub & Git</li>
              <li>Jira</li>
              <li>Figma</li>
              <li>Postman</li>
              <li>Chrome DevTools</li>
              <li>NPM/Yarn</li>
              <li>Docker Desktop</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quote/Closing Section */}
      <div className="skills-quote">
        <blockquote>
          "The best way to predict the future is to implement it."
        </blockquote>
        <p className="quote-author">— Inspired by Alan Kay</p>
      </div>
    </div>
  );
};

export default Skills;
