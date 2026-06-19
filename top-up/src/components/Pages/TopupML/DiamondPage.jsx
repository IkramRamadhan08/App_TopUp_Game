import React from 'react';

const DiamondPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-center text-2xl font-bold mt-10">Top Up Diamond</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-4">
        {/* Tambahkan kartu game */}
        <div className="bg-gray-800 rounded-md p-4 text-center">
          <img src="/assets/mobile-legends.png" alt="Mobile Legends" className="w-16 h-16 mx-auto" />
          <p className="text-white mt-2">Mobile Legends</p>
        </div>
        <div className="bg-gray-800 rounded-md p-4 text-center">
          <img src="/assets/free-fire.png" alt="Free Fire" className="w-16 h-16 mx-auto" />
          <p className="text-white mt-2">Free Fire</p>
        </div>
        {/* Tambahkan game lainnya */}
      </div>
    </div>
  );
};

export default DiamondPage;
