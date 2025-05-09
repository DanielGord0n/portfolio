import React from 'react';
import '../styles/Resume.css';

const Resume = () => {
  const experiences = [
    {
      company: 'The Kind Pet',
      position: 'Market Research & Outreach Intern',
      description: 'I conducted in-depth research to identify 40+ U.S.-based boutique retailers aligned with The Kind Pet\'s sustainability-driven mission. I created a detailed outreach report including store profiles, social media analysis, and brand compatibility recommendations. The report provided a foundation for B2B growth and helped guide the company\'s retail expansion strategy.',
      skills: ['Market research', 'competitor analysis', 'sustainability branding']
    },
    {
      company: 'Canadian Marketing League',
      position: 'Virtual Campus Account Manager Intern',
      description: 'In this national internship program, I represented Schulich in campus-level marketing and engagement initiatives. I built relationships with students and professors, organized promotional efforts, and contributed to national campaign execution. I also took part in team workshops that sharpened my collaborative and strategic planning abilities.',
      skills: ['Campaign coordination', 'team collaboration', 'public speaking']
    }
  ];

  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume</h1>
      
      <div className="experiences">
        {experiences.map((exp, index) => (
          <div className="experience" key={index}>
            <div className="experience-header">
              <h2 className="company">{exp.company} – <span className="position">{exp.position}</span></h2>
            </div>
            <div className="experience-content">
              <p className="description">{exp.description}</p>
              <p className="skills">
                <strong>Key Skills:</strong> {exp.skills.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
