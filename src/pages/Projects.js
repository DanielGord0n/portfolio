import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard3D from '../components/ProjectCard3D';
import PageTransition from '../components/PageTransition';
import '../styles/Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  // Hardcoded project data to ensure availability
  const projects = [
    // --- FEATURED ---
    {
      id: 12,
      title: 'AI/ML Research Assistant',
      description: 'Designed automated validation and stress-testing pipelines to evaluate algorithmic behavior across 1,000+ experimental runs. Analyzed large-scale experimental outputs to identify failure patterns and discrepancies. Produced reproducible reports summarizing empirical findings, emphasizing reliability over theoretical novelty.',
      technologies: ['Python', 'Data Analysis', 'ML Pipelines', 'Automated Testing', 'Research'],
      image: require('../images/wilfrid-laurier-university-seeklogo.png'),
      category: 'Machine Learning',
      isFeatured: true,
      link: null,
      github: null,
      company: 'Wilfrid Laurier University'
    },
    {
      id: 5,
      title: 'AI-Powered 3D Avatar Platform',
      description: 'Engineered a scalable lip-sync ML pipeline for real-time 3D avatar animation. Architected the Python/Next.js infrastructure to orchestrate LLM responses and speech generation, exposing capabilities via optimized REST APIs. Reduced global inference latency by ~25% through model benchmarking and systems optimization.',
      technologies: ['Python', 'Unity', 'OpenAI Whisper', 'LangChain', 'Next.js'],
      image: require('../images/MCGLogo.png'),
      category: 'Full Stack Development',
      isFeatured: true,
      link: 'https://mycleanmesh.com/',
      github: null,
      company: 'MCG'
    },
    {
      id: 4,
      title: 'LaunchPath Biotech Architecture',
      description: 'Owned the full-stack solution architecture for a biosensor analytics platform. Designed C4 system diagrams, defined API specifications, and implemented a React Native + Python microservices ecosystem for real-time data ingestion. Delivered a secure, production-ready system for clinical data reporting.',
      technologies: ['React Native', 'Python', 'Microservices', 'C4 Architecture'],
      image: require('../images/launchpathLogo.png'),
      category: 'Full Stack Development',
      isFeatured: true,
      link: null,
      github: 'https://github.com/DanielGord0n/aptamer_therapeutic',
      company: 'LaunchPath Inc.'
    },
    {
      id: 3,
      title: 'AI-Powered WhatsApp Summarizer',
      description: 'Developed an automated AI summarization system processing high-volume chat data. Built robust backend services to handle message streams, implemented failure recovery mechanisms, and optimized Gemini AI prompts for reliable daily digests. Focused on system stability and data consistency.',
      technologies: ['Node.js', 'WhatsApp Web', 'Gemini AI', 'Express', 'System Design'],
      image: require('../images/WhatsappLogoBlack.png'),
      category: 'Full Stack Development',
      isFeatured: true,
      link: 'https://phoenix-bot-web.vercel.app/',
      github: 'https://github.com/DanielGord0n',
      company: 'Contract Work'
    },
    {
      id: 1,
      title: 'TourSage - AI Tour Guide',
      description: 'Built a cross-platform tour guide app with dynamic routes, maps integration, and an API that returns structured itineraries. Focused on clean data outputs and UX-driven iteration.',
      technologies: ['React Native', 'Expo', 'Node.js', 'TypeScript', 'Google Places API'],
      image: require('../images/TourSageLogo.png'),
      category: 'Mobile Development',
      isFeatured: true, // Optional featured as per instructions
      link: null,
      github: null,
      company: 'Personal Project'
    },

    // --- ADDITIONAL ---
    {
      id: 2,
      title: 'N-Queens RL & CSP Solver',
      description: 'Implemented an optimized Min-Conflicts CSP solver scaling to N=1,000,000. Designed greedy initialization and constant-time conflict repair to reduce runtime to O(n).',
      technologies: ['Python', 'Min-Conflicts CSP', 'Optimization', 'PyTorch'],
      image: require('../images/QueenIcon.png'),
      category: 'Machine Learning',
      isFeatured: false,
      link: null,
      github: null,
      company: 'Academic Project'
    },
    {
      id: 9,
      title: 'Waiver Submission App',
      description: 'Built a full-stack liability waiver management system using React and Prisma. Reduced administrative processing time by 40% through automated database storage and retrieval.',
      technologies: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel'],
      image: require('../images/waiver.png'),
      category: 'Frontend Development',
      isFeatured: false,
      link: null,
      github: 'https://github.com/DanielGord0n/pool-waiver',
      company: 'Contract Work'
    },
    {
      id: 7,
      title: 'wluNest - Student Housing',
      description: 'Developed a rental aggregation platform (React/Node.js/MySQL) with interactive maps. Implemented real-time data updates and responsive UI components.',
      technologies: ['React', 'Node.js', 'MySQL', 'Maps API'],
      image: require('../images/wilfrid-laurier-university-seeklogo.png'),
      category: 'Full Stack Development',
      isFeatured: false,
      link: null,
      github: 'https://github.com/WluNest/wluNest-App',
      company: 'Academic Project'
    },
    {
      id: 8,
      title: 'Battleships Game',
      description: 'Implemented a Battleships game in Java with a Swing GUI and OOP design patterns. Built an AI opponent using minimax-style heuristics and state pruning.',
      technologies: ['Java', 'Maven', 'OOP', 'GUI'],
      image: require('../images/battleshipcycles-logo-ftr.png'),
      category: 'Software Development',
      isFeatured: false,
      link: null,
      github: 'https://github.com/y-fysiks/ICS4U-CPT-Battleship',
      company: 'Academic Project'
    },
    {
      id: 6,
      title: 'Futures and Fringes CMS',
      description: 'Designed and launched a CMS-powered website in Framer. Improved mobile load times by 25% and integrated interactive features for better user engagement.',
      technologies: ['Framer', 'CMS', 'UI/UX Design'],
      image: require('../images/FF-ICON-BLK.png'),
      category: 'Frontend Development',
      isFeatured: false,
      link: 'https://www.futuresandfringes.com/',
      github: null,
      company: 'Futures and Fringes'
    },
    {
      id: 11,
      title: 'Multiplayer Roblox Game',
      description: 'Working on a multiplayer game using Lua and the Roblox framework. Focus on networking, server-client interaction, and game state management.',
      technologies: ['Lua', 'Roblox Framework', 'Networking'],
      image: require('../images/robloxLogo.png'),
      category: 'Game Development',
      isFeatured: false,
      link: null,
      github: 'https://github.com/DanielGord0n',
      company: 'Personal Project'
    },
    {
      id: 10,
      title: 'Personal Developer Portfolio',
      description: 'Designed and developed a custom portfolio website using React and Framer Motion. You are currently viewing it!',
      technologies: ['React', 'Framer Motion', '3D Tilt', 'Modern CSS'],
      image: require('../images/DG_logo.png'),
      category: 'Frontend Development',
      isFeatured: false,
      link: null,
      github: 'https://github.com/DanielGord0n',
      company: 'Personal Project'
    }
  ];

  // Derive categories
  const categories = ['All', 'Featured', ...new Set(projects.map(p => p.category))];

  // Helper to render a grid of projects
  const renderGrid = (items) => (
    <div className="projects-grid">
      {items.map(project => {
        const links = [];
        if (project.github) links.push({ url: project.github, icon: <FaGithub size={20} /> });
        if (project.link) links.push({ url: project.link, icon: <FaExternalLinkAlt size={18} /> });

        return (
          <ProjectCard3D
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.technologies}
            links={links}
            image={project.image}
            customImageClass={project.id === 6 ? 'ff-img' : ''}
          />
        );
      })}
    </div>
  );

  // Get the projects to display based on filter
  let projectsToDisplay;

  if (filter === 'All') {
    projectsToDisplay = projects; // Show all projects
  } else if (filter === 'Featured') {
    projectsToDisplay = projects.filter(p => p.isFeatured);
  } else {
    projectsToDisplay = projects.filter(p => p.category === filter);
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Below are key projects from my professional experience. Each project demonstrates my ability to deliver
          high-quality solutions and measurable business impact.
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

      {renderGrid(projectsToDisplay)}
    </div>
  );
};

export default PageTransition(Projects);
