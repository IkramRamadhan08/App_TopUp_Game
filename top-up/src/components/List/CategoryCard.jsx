import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ image, title, description, link}) => {
  
  return (
    
    <div id="Games" className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:border-2 border-blue-600">
      <Link to={link} >
      <img
        src={image}
        alt={title}
        className=" w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
     
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        
      </div>
      </Link>
    </div>
    
  );
};

export default CategoryCard;
