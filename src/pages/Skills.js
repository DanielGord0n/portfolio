import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'React.js', level: 85 },
        { name: 'HTML5/CSS3', level: 90 },
        { name: 'Redux', level: 80 },
        { name: 'Responsive Design', level: 85 },
        { name: 'TypeScript', level: 75 },
        { name: 'SASS/LESS', level: 80 },
        { name: 'Bootstrap/Material UI', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 85 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'GraphQL', level: 70 },
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'Authentication/Security', level: 80 },
        { name: 'Serverless Architecture', level: 70 }
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD Pipelines', level: 70 },
        { name: 'AWS Services', level: 65 },
        { name: 'Testing (Jest, Mocha)', level: 80 },
        { name: 'Webpack/Babel', level: 75 },
        { name: 'Linux', level: 70 },
        { name: 'Agile Methodology', level: 85 }
      ]
    }
  ];

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1>My Technical Skills</h1>
        <p>
          As a Full Stack Developer, I've cultivated a diverse set of technical skills
          through both professional experience and personal projects. I'm committed to
          continuous learning and staying current with the latest technologies.
        </p>
      </div>

      <div className="skills-content">
        {skillCategories.map((category, index) => (
          <div className="skill-section" key={index}>
            <h2>{category.title}</h2>
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

      <div className="additional-skills">
        <h2>Additional Skills & Knowledge</h2>
        <div className="additional-grid">
          <div className="additional-card">
            <h3>Soft Skills</h3>
            <ul>
              <li>Project Management</li>
              <li>Team Leadership</li>
              <li>Problem Solving</li>
              <li>Technical Documentation</li>
              <li>Client Communication</li>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
