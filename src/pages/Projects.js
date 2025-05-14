import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered WhatsApp Summarizer',
      description: 'Engineered a chat summarization tool that integrates the WhatsApp API with Gemini AI to automatically condense lengthy message threads into concise daily digests, improving information retention and reducing cognitive overload for users.',
      technologies: ['Node.js', 'WhatsApp API', 'Gemini AI', 'RESTful APIs', 'Express'],
      image: 'https://via.placeholder.com/600x350/2a3f5c/ffffff?text=WhatsApp+AI+Summarizer',
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
      image: 'https://via.placeholder.com/600x350/1e4d2b/ffffff?text=Email+Digest+System',
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
      image: 'https://via.placeholder.com/600x350/463a5c/ffffff?text=Futures+and+Fringes',
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
      image: 'https://via.placeholder.com/600x350/5c3a3a/ffffff?text=wluNest',
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
      image: 'https://via.placeholder.com/600x350/3a5c5c/ffffff?text=Battleships+Game',
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
      image: 'https://via.placeholder.com/600x350/2a4a7c/ffffff?text=Waiver+Submission+App',
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
      image: 'https://via.placeholder.com/600x350/4d3a5c/ffffff?text=Roblox+Game',
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
              <img src={project.image} alt={project.title} />
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="demo-link">Live Demo</a>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="code-link">View Code</a>
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
