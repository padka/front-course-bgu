import React from 'react';
import './Adventage.css'; 
import advantageData from '../../Data/advantageData';

const AdvantagesComponent = () => {
  return (
      <>
        <h2 className='advantage-text'>Наши преимущества</h2>
        <div className="advantages-container">
          {advantageData.map((item, index) => (
              <div key={index} className="advantage-item">
                <h3>{item.text}</h3>
                <a href={item.link}>{item.linkText}</a>
              </div>
          ))}
        </div>
      </>
  );
};

export default AdvantagesComponent;
