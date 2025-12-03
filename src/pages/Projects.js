import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard3D from '../components/ProjectCard3D';
import PageTransition from '../components/PageTransition';
import '../styles/Projects.css';

const Projects = () => {

  const projects = [
    {
      id: 1,
      title: 'TourSage – AI Tour Guide',
      description: 'Built a cross-platform mobile app that serves dynamic, GPS-aware tours. Implemented "Tour" and "Explore" modes on an interactive map with real-time tracking. Developed a typed REST API that generates itineraries with Gemini AI (RAG + embeddings), enriches stops with Google Places data, and returns structured routes.',
      technologies: ['React Native', 'Expo', 'Node.js', 'TypeScript', 'Python', 'Gemini AI', 'Google Places API'],
      image: require('../images/TourSageLogo.png'),
      category: 'Mobile Development',
      link: null,
      github: null,
      company: 'Personal Project'
    },
    {
      id: 2,
      title: 'N-Queens RL & CSP Solver',
      description: 'Implemented an optimized Min-Conflicts CSP solver capable of scaling to N=1,000,000 with ~20s solution times. Designed greedy initialization and constant-time conflict repair to reduce runtime to O(n). Built benchmarking tools to verify correctness and performance.',
      technologies: ['Python', 'Min-Conflicts CSP', 'Optimization', 'PyTorch', 'Benchmarking'],
      image: require('../images/QueenIcon.png'),
      category: 'Machine Learning',
      link: null,
      github: null,
      company: 'Academic Project'
    },
    {
      id: 3,
      title: 'AI-Powered WhatsApp Summarizer',
      description: 'Engineered a chat summarization tool integrating WhatsApp Web API with Gemini AI to condense chat threads into concise daily digests. Optimized latency and context-window usage via dynamic chunking and caching strategies.',
      technologies: ['Node.js', 'WhatsApp API', 'Gemini AI', 'Express', 'NLP'],
      image: require('../images/WhatsappLogoBlack.png'),
      category: 'Full Stack Development',
      link: 'https://phoenix-bot-web.vercel.app/',
      github: 'https://github.com/DanielGord0n',
      company: 'Contract Work'
    },
    {
      id: 4,
      title: 'LaunchPath Biotech Architecture',
      description: 'Architected a scalable system for a biosensor analytics platform, producing C4 diagrams and technical specifications. Developed a responsive React Native front end with secure integration to Python microservices for real-time biosensor data ingestion.',
      technologies: ['React Native', 'Python', 'Microservices', 'C4 Architecture'],
      image: require('../images/launchpathLogo.png'),
      category: 'Full Stack Development',
      link: null,
      github: 'https://github.com/DanielGord0n/aptamer_therapeutic',
      company: 'LaunchPath Inc.'
    },
    {
      id: 5,
      title: 'AI-Powered 3D Avatar Platform',
      description: 'Refactored lip-sync pipelines for 3D avatars in Unity, improving phoneme-to-blend-shape alignment. Prototyped end-to-end AI workflows with Whisper and LangChain. Implemented model-level optimizations reducing inference latency by ~25%.',
      technologies: ['Python', 'Unity', 'OpenAI Whisper', 'LangChain', 'Next.js'],
      image: require('../images/MCGLogo.png'),
      category: 'Full Stack Development',
      link: 'https://mycleanmesh.com/',
      github: null,
      company: 'MCG'
    },
    {
      id: 6,
      title: 'Futures and Fringes CMS',
      description: 'Designed and launched a CMS-powered website in Framer, improving mobile load times by 25% and boosting user engagement by 15%. Integrated interactive features like scroll-triggered animations and newsletter sign-ups.',
      technologies: ['Framer', 'CMS', 'UI/UX Design', 'Interactive'],
      image: require('../images/FF-ICON-BLK.png'),
      category: 'Frontend Development',
      link: 'https://www.futuresandfringes.com/',
      github: null,
      company: 'Futures and Fringes'
    },
    {
      id: 7,
      title: 'wluNest - Student Housing',
      description: 'Developed a platform aggregating Waterloo-Kitchener rental listings. Designed an intuitive UI with interactive maps, personalized filters, and a roommate finder. Integrated real-time updates and direct listing links.',
      technologies: ['React', 'Node.js', 'MySQL', 'Maps API'],
      image: require('../images/wilfrid-laurier-university-seeklogo.png'),
      category: 'Full Stack Development',
      link: null,
      github: 'https://github.com/WluNest/wluNest-App',
      company: 'Academic Project'
    },
    {
      id: 8,
      title: 'Battleships Game',
      description: 'Developed a fully functional recreation of "Battleships" using Java/Maven with an intuitive GUI. Implemented an AI opponent using minimax-style decision trees and pruning heuristics.',
      technologies: ['Java', 'Maven', 'OOP', 'GUI', 'AI Logic'],
      image: require('../images/battleshipcycles-logo-ftr.png'),
      category: 'Software Development',
      link: null,
      github: 'https://github.com/y-fysiks/ICS4U-CPT-Battleship',
      company: 'Academic Project'
    },
    {
      id: 9,
      title: 'Waiver Submission App',
      description: 'Designed and implemented applications using React.js and Prisma to manage liability waivers with a robust online database, reducing admin time by 40%.',
      technologies: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel'],
      image: require('../images/waiver.png'),
      category: 'Frontend Development',
      link: null,
      github: 'https://github.com/DanielGord0n/pool-waiver',
      company: 'Contract Work'
    },
    {
      id: 10,
      title: 'Personal Developer Portfolio',
      description: 'Designed and developed a custom portfolio website showcasing my projects and skills. You are currently viewing it!',
      technologies: ['React', 'Framer Motion', '3D Tilt', 'Modern CSS'],
      image: require('../images/DG_logo.png'),
      category: 'Frontend Development',
      link: null,
      github: 'https://github.com/DanielGord0n',
      company: 'Personal Project'
    },
    {
      id: 11,
      title: 'Multiplayer Roblox Game',
      description: 'Working on a multiplayer game and server using Lua and the Roblox framework, building skills in game development, networking, and server-client interaction within a complex environment.',
      technologies: ['Lua', 'Roblox Framework', 'Networking', 'Game Development'],
      image: require('../images/robloxLogo.png'),
      category: 'Game Development',
      link: null,
      github: 'https://github.com/DanielGord0n',
      company: 'Personal Project'
    }
  ];

  const [filter, setFilter] = useState('All');
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

      <div className="projects-grid">
        {filteredProjects.map(project => {
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
    </div>
  );
};

export default PageTransition(Projects);
