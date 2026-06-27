import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProduk(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Produk</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Tipe</th>
              <th className="py-2 px-4 text-right">Harga</th>
              <th className="py-2 px-4 text-left">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              produk.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4 capitalize">{item.type}</td>
                  <td className="py-2 px-4 text-right">Rp {Number(item.price).toLocaleString()}</td>
                  <td className="py-2 px-4 capitalize">{item.category || '-'}</td>
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
