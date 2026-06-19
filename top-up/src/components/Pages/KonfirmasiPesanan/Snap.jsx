import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SnapCheckout = ({ invoiceNumber, snapToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onPending: () => console.log('Menunggu pembayaran'),
        onSuccess: () => console.log('Pembayaran sukses'),
        onClose: () => console.log('Snap ditutup'),
      });
    }
  }, [snapToken]);

  const handleCheckStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cek-status/${invoiceNumber}`);
      navigate('/invoice', { state: { invoice: res.data } });
    } catch (err) {
      alert('Gagal mengambil status.');
    }
  };

  return (
    <div className="text-center mt-6">
      {/* Snap muncul otomatis */}
      <button
        onClick={handleCheckStatus}
        className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-5 rounded mt-6"
      >
        Check Status Sekarang
      </button>
    </div>
  );
};

export default SnapCheckout;
