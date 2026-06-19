import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = () => {
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
    const dummyProducts = [
  { Game: 'Mobile Legends',Pulsa_Kuota: 'Telkomsel'},
  { Game: 'Free Fire', Pulsa_Kuota: 'Indosat'},
  { Game: 'Genshin Impact',Pulsa_Kuota: 'XL'},
  { Game: 'PUBG Mobile', Pulsa_Kuota: 'Axis'},
  { Game: 'Honor Of Kings', Pulsa_Kuota: 'Smartfren'},


  ]

  useEffect(() => {
    // Simulasikan loading seperti API
    setTimeout(() => {
      setProduk(dummyProducts);
      setIsLoading(false);
    }, 500);
  }, []);


  
  const handleEdit = (data) => {
    console.log('Edit data:', data);
    // tampilkan form edit jika diperlukan
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Produk</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Game</th>
              <th className="py-2 px-4 text-left">Pulsa & Kuota</th>
              
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              produk.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 capitalize">{item.Game}</td>
                  <td className="py-2 px-4 capitalize">{item.Pulsa_Kuota}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
