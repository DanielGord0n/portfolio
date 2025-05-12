import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Full Stack E-Commerce Platform',
      description: 'A complete e-commerce solution with product catalog, shopping cart, user authentication, and payment processing.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      image: 'https://via.placeholder.com/600x350/2a3f5c/ffffff?text=E-Commerce+App',
      category: 'Web Application',
      link: 'https://github.com/DanielGord0n/ecommerce-demo',
      demo: 'https://ecommerce-demo.danielgordon.dev'
    },
    {
      id: 2,
      title: 'Real-Time Chat Application',
      description: 'Chat application with real-time messaging, user presence indicators, and file sharing capabilities.',
      technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
      image: 'https://via.placeholder.com/600x350/1e4d2b/ffffff?text=Chat+App',
      category: 'Web Application',
      link: 'https://github.com/DanielGord0n/chat-app',
      demo: 'https://chat.danielgordon.dev'
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'Project management tool with task tracking, team collaboration features, and detailed analytics dashboard.',
      technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Chart.js'],
      image: 'https://via.placeholder.com/600x350/463a5c/ffffff?text=Task+Manager',
      category: 'Web Application',
      link: 'https://github.com/DanielGord0n/task-manager',
      demo: 'https://tasks.danielgordon.dev'
    },
    {
      id: 4,
      title: 'Weather Dashboard API',
      description: 'RESTful API service that aggregates weather data from multiple sources with caching and rate limiting.',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'OpenWeatherMap API'],
      image: 'https://via.placeholder.com/600x350/2b5c5c/ffffff?text=Weather+API',
      category: 'API Service',
      link: 'https://github.com/DanielGord0n/weather-api',
      demo: 'https://api.weather.danielgordon.dev/docs'
    },
    {
      id: 5,
      title: 'Developer Portfolio Website',
      description: 'Personal portfolio website showcasing projects, skills, and resume. Built with React and modern CSS.',
      technologies: ['React', 'React Router', 'Modern CSS', 'Responsive Design'],
      image: 'https://via.placeholder.com/600x350/5c3a3a/ffffff?text=Portfolio+Site',
      category: 'Web Design',
      link: 'https://github.com/DanielGord0n/portfolio',
      demo: 'https://danielgordon.dev'
    },
    {
      id: 6,
      title: 'Content Management System',
      description: 'Headless CMS built from scratch with user roles, content versioning, and API access.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React Admin', 'JWT Authentication'],
      image: 'https://via.placeholder.com/600x350/3a5c5c/ffffff?text=CMS+System',
      category: 'Web Application',
      link: 'https://github.com/DanielGord0n/headless-cms',
      demo: 'https://cms-demo.danielgordon.dev'
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
          Here are some of the projects I've worked on. Each project presented unique challenges 
          and opportunities to apply and expand my technical skills.
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
              <span className="project-category">{project.category}</span>
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
