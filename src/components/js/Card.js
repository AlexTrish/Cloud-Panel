import React from 'react';
import '../css/index.scss';

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <div className="card-wrapper">
        <h3 className="card-title">{title}</h3>
        <div className="card-line"></div>
      </div>
      <div className="card-content">
        {content}
        <div className="card-img"></div>
        </div>
    </div>
  );
};

export default Card;