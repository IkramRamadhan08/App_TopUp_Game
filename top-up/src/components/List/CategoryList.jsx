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
    image: './image/hok.jpg',
    title: 'Honor of Kings',
    description: 'Top up Honor of Kings',
    link: '/DiamonHok',
  },
  {
    id: 4,
    image: './image/pubg.webp',
    title: 'PUBG Mobile',
    description: 'Top up UC PUBG Mobile',
    link: '/DiamondPubg',
  },
];

// Fungsi scroll
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const CategoryList = ({ search = "" }) => {
  const filtered = games.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mx-auto my-8 px-4">
      {/* Tombol navigasi section */}
      <div className="flex flex-1 gap-4 pb-6 justify-center">
        <Button variant="bg-blue-600" onClick={() => scrollToSection('games')}>Top Up Games</Button>
      </div>

      {/* Section Games */}
      <div id="games" className="py-0">
        <h2 className="text-xl font-bold text-white mb-4">Top Up Games</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Game tidak ditemukan</p>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              title={category.title}
              description={category.description}
              link={category.link}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
