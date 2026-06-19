import React from 'react';
import Header from './components/Header';
import CategoryList from './components/List/CategoryList';

import Footer from './components/Footer';
import Banner from './components/Pages/Banner';


const PublicLayout = () => {
  

  return (
    <div className="bg-slate-950 min-h-screen">
      <Header />
      
      
      <main className="container-fluid mx-auto px-4 py-20">
        <div className="">
      <Banner variant="h-80"
              img="./image/banner.jpg"
      >
        Top Up Murah & Cepat</Banner>
        </div>
      <CategoryList  />
      
        
    
      </main>
      <Footer />
  
    </div>
    
  );
};

export default PublicLayout;

