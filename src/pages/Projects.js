import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard3D from '../components/ProjectCard3D';
import PageTransition from '../components/PageTransition';
import '../styles/Projects.css';

const Projects = () => {

  const projects = [
    {
      id: 1,
      title: 'AI-Powered WhatsApp Summarizer',
      description: 'Engineered a chat summarization tool that integrates the WhatsApp API with Gemini AI to automatically condense lengthy message threads into concise daily digests.',
      technologies: ['Node.js', 'WhatsApp API', 'Gemini AI', 'Express'],
      image: require('../images/WhatsappLogoBlack.png'),
      category: 'Full Stack Development',
      link: 'https://phoenixbot.up.railway.app/',
      github: 'https://github.com/DanielGord0n',
      company: 'Contract Work'
    },
    {
      id: 2,
      title: 'LaunchPath Biotech Architecture',
      description: 'Spearheaded end-to-end solution architecture for LaunchPath\'s Biotech projects, translating business requirements into scalable C4 diagrams and technical specifications.',
      technologies: ['React', 'Python', 'Microservices', 'C4 Architecture'],
      image: require('../images/launchpathLogo.png'),
      category: 'Full Stack Development',
      link: null,
      github: 'https://github.com/DanielGord0n/aptamer_therapeutic',
      company: 'LaunchPath Inc.'
    },
    {
      id: 3,
      title: 'AI-Powered 3D Avatar Platform',
      description: 'Refactored and enhanced lip-sync pipelines for 3D avatars in Unity. Built end-to-end AI workflows with OpenAI Whisper and LangChain.',
      technologies: ['Python', 'Unity', 'OpenAI Whisper', 'LangChain', 'Next.js'],
      image: require('../images/MCGLogo.png'),
      category: 'Full Stack Development',
      link: 'https://mycleanmesh.com/',
      github: null,
      company: 'MCG'
    },
    {
      id: 4,
      title: 'Automated Email Digest System',
      description: 'Developed a scheduled email-delivery system that sends WhatsApp conversation summaries to subscribers, reducing manual review time by over 80%.',
      technologies: ['Node.js', 'Express', 'Cloud Mail', 'MySQL'],
      image: require('../images/email.png'),
      category: 'Backend Development',
      link: null,
      github: 'https://github.com/gordondm/phoenix-bot',
      company: 'Contract Work'
    },
    {
      id: 5,
      title: 'Futures and Fringes CMS',
      description: 'Led the UI/UX build of a Framer-powered CMS website, integrating newsletter sign-ups and interactive scroll effects.',
      technologies: ['Framer', 'CMS', 'UI/UX Design', 'Interactive'],
      image: require('../images/FF-ICON-BLK.png'),
      category: 'Frontend Development',
      link: 'https://www.futuresandfringes.com/',
      github: null,
      company: 'Futures and Fringes'
    },
    {
      id: 6,
      title: 'Personal Developer Portfolio',
      description: 'Designed and developed a custom portfolio website showcasing my projects and skills. You are currently viewing it!',
      technologies: ['React', 'Framer Motion', '3D Tilt', 'Modern CSS'],
      image: null, // Special case handled in card? Or just use placeholder
      category: 'Frontend Development',
      link: null,
      github: 'https://github.com/DanielGord0n',
      company: 'Personal Project'
    },
    {
      id: 7,
      title: 'wluNest - Student Housing',
      description: 'Developed a platform aggregating Waterloo-Kitchener rental listings. Integrated real-time updates and direct listing links.',
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
      description: 'Developed a fully functional recreation of the classic "Battleships" game using Java and Maven, including an intuitive GUI and an AI opponent.',
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
      description: 'Designed and implemented applications using React.js and Prisma to manage liability waivers with a robust online database.',
      technologies: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel'],
      image: require('../images/waiver.png'),
      category: 'Frontend Development',
      link: null,
      github: 'https://github.com/DanielGord0n/pool-waiver',
      company: 'Contract Work'
    },
    {
      id: 10,
      title: 'Multiplayer Roblox Game',
      description: 'Working on a multiplayer game and server using Lua and the Roblox framework, building skills in game development and networking.',
      technologies: ['Lua', 'Roblox', 'Networking', 'Game Dev'],
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
              customImageClass={project.id === 5 ? 'ff-img' : ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageTransition(Projects);
