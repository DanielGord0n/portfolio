import React from 'react';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Changing the skincare industry through CX experience',
      image: 'skincare.jpg',
      type: 'PDF file',
      link: '#'
    },
    {
      id: 2,
      title: 'Digital marketing strategy for sustainable fashion',
      image: 'fashion.jpg',
      type: 'Case Study',
      link: '#'
    },
    {
      id: 3,
      title: 'Social media campaign for local food brand',
      image: 'food.jpg',
      type: 'Campaign',
      link: '#'
    }
  ];

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Portfolio</h1>
      
      <div className="portfolio-grid">
        {portfolioItems.map(item => (
          <div className="portfolio-item" key={item.id}>
            <div className="portfolio-image-container">
              <img 
                src={`https://via.placeholder.com/400x300/f7f0ed/c9927a?text=${item.type}`} 
                alt={item.title}
                className="portfolio-image"
              />
            </div>
            <div className="portfolio-item-info">
              <p className="portfolio-type">{item.type}</p>
              <h3 className="portfolio-item-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
