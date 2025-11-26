import React, { useEffect, useRef } from 'react';
import SkillsSphere from '../components/SkillsSphere';
import ExperienceTimeline from '../components/ExperienceTimeline';
import PageTransition from '../components/PageTransition';
import '../styles/Skills.css';

const Skills = () => {
  // Update document title
  useEffect(() => {
    document.title = 'Skills | Daniel Gordon - Full Stack Developer';
  }, []);

  // Create refs directly in the component body
  const mainSkillsRef = useRef(null);
  const skillBarsRef = useRef(null);
  const workProcessRef = useRef(null);
  const additionalSkillsRef = useRef(null);
  const programmingLanguagesRef = useRef(null);

  // Group refs in an object for easier handling
  const sectionRefs = {
    mainSkills: mainSkillsRef,
    skillBars: skillBarsRef,
    workProcess: workProcessRef,
    additionalSkills: additionalSkillsRef,
    programmingLanguages: programmingLanguagesRef
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skillCategories = [
    {
      title: 'Frontend & Mobile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
      description: 'Building responsive web and mobile applications with modern frameworks',
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'React Native / Expo', level: 85 },
        { name: 'TypeScript', level: 85 },
        { name: 'Flutter / Dart', level: 75 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Framer / Figma', level: 85 },
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'Three.js / Babylon.js', level: 70 }
      ]
    },
    {
      title: 'Backend & Systems',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      description: 'Architecting robust server-side solutions and managing databases',
      skills: [
        { name: 'Node.js / Express', level: 88 },
        { name: 'Python / Flask', level: 90 },
        { name: 'Java / Maven', level: 85 },
        { name: 'C / C++', level: 80 },
        { name: 'SQL (MySQL/Postgres)', level: 85 },
        { name: 'NoSQL (MongoDB)', level: 80 },
        { name: 'Prisma ORM', level: 85 },
        { name: 'Unix / Bash', level: 75 }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
          <path d="M19 11c.6 0 1.1.2 1.5.7l1 1c.4.4.6.9.5 1.4-.1.6-.5 1.1-1 1.4l-4.7 2.8c-.7.4-1.5.6-2.3.6h-1.2"></path>
          <path d="M8 10.2c-1 0-1.9.5-2.5 1.2l-.7.8c-.6.7-1 1.6-1 2.5 0 .9.3 1.8 1 2.5l.7.8c.6.7 1.5 1.2 2.5 1.2"></path>
          <path d="m8 22 3.75-14"></path>
        </svg>
      ),
      description: 'Developing intelligent systems with state-of-the-art ML frameworks',
      skills: [
        { name: 'PyTorch / TensorFlow', level: 85 },
        { name: 'Scikit-learn', level: 88 },
        { name: 'NumPy / Pandas', level: 90 },
        { name: 'Reinforcement Learning', level: 80 },
        { name: 'LLM Integration (Gemini)', level: 85 },
        { name: 'Hugging Face', level: 80 },
        { name: 'Computer Vision', level: 75 },
        { name: 'R / Statsmodels', level: 70 }
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
      <div className="no-gap-container">


        {/* Main Skills Header Section */}
        <div className="skills-header" ref={sectionRefs.mainSkills}>
          <h1>My Technical Skills</h1>
          <p className="skills-intro">
            As a fourth-year Honours Bachelor of Computer Science and Management student at Wilfrid Laurier University,
            I've developed a versatile technical skill set through academic projects and professional experience as a Contract Full Stack Developer.
            Based in Vaughan, Ontario, I'm passionate about creating intuitive, user-focused solutions.
          </p>
          <div className="skills-overview">
            <div className="skill-highlight">
              <div className="highlight-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
              <h3>1+ Year</h3>
              <p>Professional Experience</p>
            </div>
            <div className="skill-highlight">
              <div className="highlight-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>3+</h3>
              <p>Major Projects</p>
            </div>
            <div className="skill-highlight">
              <div className="highlight-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3>CS & Mgmt</h3>
              <p>Dual Specialization</p>
            </div>
          </div>
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

        {/* Experience Section */}
        <div className="experience-section" ref={sectionRefs.workProcess}>
          <h2>Professional Experience</h2>
          <ExperienceTimeline />
        </div>

        {/* Skills Sphere Section */}
        <div className="languages-section" ref={sectionRefs.programmingLanguages}>
          <h2>Technical Skills</h2>
          <SkillsSphere />
        </div>

        {/* Skill Categories with Progress Bars */}
        <div ref={sectionRefs.skillBars}>
          {skillCategories.map((category, index) => {
            return (
              <div className="skill-section" key={index}>
                <div className="skill-category-header">
                  <div className="skill-category-icon">{category.icon}</div>
                  <div className="skill-category-text">
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className="skill-tags-container">
                  {category.skills.map((skill, idx) => (
                    <div className="skill-tag" key={idx}>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Section */}
        <div className="additional-skills-section" ref={sectionRefs.additionalSkills}>
          <h2>Additional Skills & Tools</h2>
          <p className="section-intro">Complementary skills that round out my technical profile</p>

          <div className="additional-skills-grid">
            <div className="additional-card">
              <h3>Computer Science</h3>
              <ul>
                <li>Data Structures</li>
                <li>Algorithms</li>
                <li>Database Management</li>
                <li>System Architecture</li>
                <li>Operating Systems</li>
                <li>Web Development</li>
                <li>Problem Solving</li>
              </ul>
            </div>
            <div className="additional-card">
              <h3>Management Skills</h3>
              <ul>
                <li>Business Strategy</li>
                <li>Project Management</li>
                <li>Agile Methodology</li>
                <li>Team Collaboration</li>
                <li>Client Communication</li>
                <li>Product Strategy</li>
                <li>Time Management</li>
                <li>Strategic Planning</li>
              </ul>
            </div>
            <div className="additional-card">
              <h3>Professional Skills</h3>
              <ul>
                <li>End-to-End Feature Development</li>
                <li>Code Reviews & Quality Assurance</li>
                <li>Technical Documentation</li>
                <li>Cross-functional Teamwork</li>
                <li>User-Centered Design</li>
                <li>Continuous Learning</li>
                <li>Problem Analysis</li>
                <li>Pair Programming</li>
              </ul>
            </div>
            <div className="additional-card">
              <h3>Development Tools</h3>
              <ul>
                <li>VS Code</li>
                <li>GitHub & Git</li>
                <li>Figma</li>
                <li>Framer</li>
                <li>Postman</li>
                <li>Chrome DevTools</li>
                <li>NPM/Yarn</li>
                <li>Agile Project Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quote/Closing Section */}
      <div className="skills-quote">
        <blockquote>
          "I thrive in environments where designers, product managers, and developers work closely to iterate quickly on features that directly improve client satisfaction."
        </blockquote>
        <p className="quote-author">— My Development Philosophy</p>
      </div>
    </div>
  );
};

export default PageTransition(Skills);
