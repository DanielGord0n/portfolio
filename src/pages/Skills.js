import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaTerminal, FaCloud, FaServer, FaCertificate, FaBrain } from 'react-icons/fa';
import SkillsSphere from '../components/SkillsSphere';
import ExperienceTimeline from '../components/ExperienceTimeline';
import PageTransition from '../components/PageTransition';
import '../styles/Skills.css';

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

// Skill groups from PORTFOLIO_HANDOFF.md
const skillCategories = [
  {
    title: 'Languages',
    icon: <FaTerminal size={26} />,
    description: 'The day-to-day toolkit, from scripting to systems code',
    skills: ['Python', 'JavaScript / TypeScript', 'C++', 'Java', 'SQL', 'Bash', 'PowerShell'],
  },
  {
    title: 'Cloud',
    icon: <FaCloud size={26} />,
    description: 'Operating production infrastructure on AWS and GCP',
    skills: [
      'AWS S3', 'AWS EC2', 'AWS SSM', 'IAM', 'CloudWatch', 'Lambda', 'EBS', 'Identity Center',
      'GCP Cloud Run', 'Firestore', 'Compute Engine', 'Docker', 'GitHub Actions',
    ],
  },
  {
    title: 'DevOps & HPC',
    icon: <FaServer size={26} />,
    description: 'Fleet automation, incident response, and large-scale compute',
    skills: [
      'SSM Run Command', 'SSM Patch Manager', 'Fleet Manager', 'State Manager',
      'Fleet automation', 'AWS CLI', 'Incident response', 'FinOps', 'SLURM / HPC',
    ],
  },
  {
    title: 'Backend & AI',
    icon: <FaBrain size={26} />,
    description: 'Services, pipelines, and LLM integration in production',
    skills: [
      'REST APIs', 'Microservices', 'LLM integration (Gemini, Whisper, OpenAI)',
      'Real-time pipelines', 'Distributed systems', 'System design',
      'React', 'React Native', 'Node.js', 'Electron',
    ],
  },
];

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'May 2026',
    icon: <FaAws size={22} />,
  },
  {
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    date: 'In progress',
    icon: <FaAws size={22} />,
    inProgress: true,
  },
  {
    title: 'SHARCNET HPC / SLURM',
    issuer: 'Digital Research Alliance of Canada',
    date: 'Mar 2026',
    icon: <FaCertificate size={22} />,
  },
  {
    title: 'Claude Code 101 + Claude 101',
    issuer: 'Anthropic',
    date: 'May 2026',
    icon: <FaCertificate size={22} />,
  },
];

const Skills = () => {
  useEffect(() => {
    document.title = 'Skills & Experience | Daniel Gordon';
  }, []);

  return (
    <div className="skills-page">
      {/* Header */}
      <motion.div className="skills-header" {...sectionReveal}>
        <span className="section-marker">capabilities</span>
        <h1 className="silver-text">Skills &amp; Experience</h1>
        <p className="skills-intro">
          4th-year Honours Computer Science and Management student at Wilfrid Laurier University,
          AWS Certified Cloud Practitioner, and currently a DevOps / Cloud Engineering Intern at
          WellnessLiving. My skill set spans cloud operations at fleet scale, AI systems in
          production, and high-performance computing. All of it built by owning real systems end to end.
        </p>
      </motion.div>

      {/* Skill categories */}
      <motion.div className="skill-categories" {...sectionReveal}>
        {skillCategories.map((category, index) => (
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
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Skills Sphere */}
      <motion.div className="languages-section" {...sectionReveal}>
        <span className="section-marker">the full stack</span>
        <h2>Technologies</h2>
        <SkillsSphere />
      </motion.div>

      {/* Certifications */}
      <motion.div className="certifications-section" {...sectionReveal}>
        <span className="section-marker">credentials</span>
        <h2>Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <div className={`cert-card ${cert.inProgress ? 'cert-in-progress' : ''}`} key={i}>
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-body">
                <h3>{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <span className="cert-date">{cert.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div className="experience-section" {...sectionReveal}>
        <span className="section-marker">experience</span>
        <h2>Where I've worked</h2>
        <ExperienceTimeline />
      </motion.div>
    </div>
  );
};

export default PageTransition(Skills);
