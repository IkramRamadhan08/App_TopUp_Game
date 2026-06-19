import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalPendapatanCard = () => {
  const [pendapatan, setPendapatan] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/total-pendapatan')
      .then(res => setPendapatan(res.data.total_pendapatan))
      .catch(err => console.error("Gagal memuat pendapatan", err));
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Total Pendapatan</h2>
      <p className="text-2xl font-bold">Rp {parseInt(pendapatan).toLocaleString('id-ID')}</p>
    </div>
  );
};

export default TotalPendapatanCard;
