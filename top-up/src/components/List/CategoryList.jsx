import React from 'react';
import CategoryCard from './CategoryCard';
import Button from '../Button';

const games = [
  {
    id: 1,
    image: './image/logomlbb.webp',
    title: 'Mobile Legends',
    description: 'Top up Diamond Mobile Legends',
    link: '/DiamondMl',
  },
  {
    id: 2,
    image: './image/ff.jpg',
    title: 'Free Fire',
    description: 'Top up Diamond Free Fire',
    link: '/DiamondEpep',
  },
  {
    id: 3,
    image: './image/pubg.webp',
    title: 'PUBG Mobile',
    description: 'Top up UC PUBG Mobile',
  },
  {
    id: 4,
    image: './image/hok.jpg',
    title: 'Honor of Kings',
    description: 'Top up Honor of Kings',
    link: 'DiamonHok',
  },
];

const pulsa = [
  {
    id: 1,
    image: './image/telkomsel.jpg',
    title: 'Telkomsel',
    description: 'Top up pulsa Telkomsel',
  },
  {
    id: 2,
    image: './image/xl.jpg',
    title: 'XL Axiata',
    description: 'Top up pulsa XL',
  },
  {
    id: 3,
    image: './image/indosat.png',
    title: 'Indosat',
    description: 'Top up pulsa Indosat',
  },
  {
    id: 4,
    image: './image/smartfren.jpg',
    title: 'Smartfren',
    description: 'Top up pulsa Smartfren',
  },
];

const kuota = [
  {
    id: 1,
    image: './image/indosat.png',
    title: 'Indosat',
    description: 'Kuota Internet Indosat',
  },
  {
    id: 2,
    image: './image/smartfren.png',
    title: 'Smartfren',
    description: 'Kuota Internet Smartfren',
  },
];

// Fungsi scroll
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const CategoryList = () => {

  return (
    
    <div className="container-fluid mx-auto my-8 px-4">
      {/* Tombol navigasi section */}
      <div className="flex flex-1 gap-4 pb-6 justify-center">
        <Button variant="bg-blue-600" onClick={() => scrollToSection('games')}>Top Up Games</Button>
        <Button variant="bg-blue-600" onClick={() => scrollToSection('pulsa')}>Pulsa</Button>
        <Button variant="bg-blue-600" onClick={() => scrollToSection('kuota')}>Kuota</Button>
      </div>

      {/* Section Games */}
      <div id="games" className="py-0">
        <h2 className="text-xl font-bold text-white mb-4">Top Up Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              title={category.title}
              description={category.description}
              link={category.link}
            />
          ))}
        </div>
      </div>

      {/* Section Pulsa */}
      <div id="pulsa" className="my-10">
        <h2 className="text-xl font-bold text-white mb-4">Top Up Pulsa</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pulsa.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>

      {/* Section Kuota */}
      <div id="kuota" className="my-10">
        <h2 className="text-xl font-bold text-white mb-4">Kuota Internet</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kuota.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
