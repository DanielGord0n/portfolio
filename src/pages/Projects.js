import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered WhatsApp Summarizer',
      description: 'Engineered a chat summarization tool that integrates the WhatsApp API with Gemini AI to automatically condense lengthy message threads into concise daily digests, improving information retention and reducing cognitive overload for users.',
      technologies: ['Node.js', 'WhatsApp API', 'Gemini AI', 'RESTful APIs', 'Express'],
      image: require('../images/WhatsappLogoBlack.png'),
      category: 'Full Stack Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Contract Work'
    },
    {
      id: 2,
      title: 'Automated Email Digest System',
      description: 'Developed a scheduled email-delivery system that sends WhatsApp conversation summaries to subscribers, reducing manual review time by over 80% through a Node.js back-end and cloud-based mail services with robust error handling.',
      technologies: ['Node.js', 'Express', 'Cloud Mail Services', 'Scheduled Tasks', 'MySQL/Prisma'],
      image: require('../images/email.png'),
      category: 'Backend Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Contract Work'
    },
    {
      id: 3,
      title: 'Futures and Fringes CMS Website',
      description: 'Led the UI/UX build of a Framer-powered CMS website, integrating newsletter sign-ups, interactive scroll effects, and dynamic case-study pages to enhance user engagement and provide an intuitive content management experience for the client.',
      technologies: ['Framer', 'CMS Integration', 'UI/UX Design', 'Responsive Design', 'Interactive Elements'],
      image: require('../images/FF-ICON-BLK (1).png'),
      category: 'Frontend Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Contract Work'
    },
    {
      id: 4,
      title: 'Personal Developer Portfolio',
      description: 'Designed and developed a custom portfolio website showcasing my projects and skills. Built with React and modern CSS, featuring responsive design, animated transitions, and optimized performance. You are currently viewing it!',
      technologies: ['React', 'Modern CSS', 'Responsive Design', 'JavaScript', 'Git'],
      image: 'https://via.placeholder.com/600x350/2b5c5c/ffffff?text=Portfolio+Website',
      category: 'Frontend Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Personal Project'
    },
    {
      id: 5,
      title: 'wluNest - Student Housing Application',
      description: 'Developed a platform aggregating Waterloo-Kitchener rental listings for students. Designed an intuitive UI with interactive maps, personalized filters, and a roommate finder. Integrated real-time updates and direct listing links using Node.js, React, and MySQL. Delivered a polished, fully functional app that significantly streamlined the housing search process.',
      technologies: ['React', 'Node.js', 'MySQL', 'Interactive Maps', 'Real-time Updates'],
      image: require('../images/wilfrid-laurier-university-seeklogo.png'),
      category: 'Full Stack Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Academic Project'
    },
    {
      id: 6,
      title: 'Battleships Game',
      description: 'Developed a fully functional recreation of the classic "Battleships" game using Java and Maven, including an intuitive GUI and an AI opponent. Demonstrated problem-solving and coding proficiency with object-oriented principles, AI development, and algorithmic problem-solving.',
      technologies: ['Java', 'Maven', 'Object-Oriented Design', 'GUI Development', 'AI Logic'],
      image: require('../images/battleshipcycles-logo-ftr.png'),
      category: 'Software Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Academic Project'
    },
    {
      id: 7,
      title: 'Waiver Submission Applications',
      description: 'Designed and implemented applications using React.js, Prisma, Tailwind CSS, and Vercel to manage liability waivers with a robust online database, reducing admin time by 40%. Strengthened knowledge in front-end frameworks, databases, and API integration.',
      technologies: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel', 'Database Design'],
      image: require('../images/waiver.png'),
      category: 'Frontend Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Contract Work'
    },
    {
      id: 8,
      title: 'Multiplayer Roblox Game',
      description: 'Working on a multiplayer game and server using Lua and the Roblox framework, building skills in game development, networking, and server-client interaction within a complex environment.',
      technologies: ['Lua', 'Roblox Framework', 'Networking', 'Game Development', 'Server-Client Architecture'],
      image: require('../images/robloxLogo.png'),
      category: 'Game Development',
      link: 'https://github.com/DanielGord0n',
      demo: '#',
      company: 'Personal Project'
    }
  ];

  const [filter, setFilter] = React.useState('All');
  
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Below are key projects from my professional experience. Each project demonstrates my ability to deliver
          high-quality solutions and measurable business impact across different technical domains.
        </p>
        <div className="project-filters">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img 
                src={project.image} 
                alt={project.title} 
                className={project.title === 'Futures and Fringes CMS Website' ? 'ff-icon' : ''}
              />
              <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>{project.title === 'Personal Developer Portfolio' ? 'Currently viewing it' : 'View on GitHub'}</span>
                </a>
              </div>
            </div>
            <div className="project-details">
              <div className="project-header">
                <span className="project-category">{project.category}</span>
                <span className="project-company">{project.company}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
