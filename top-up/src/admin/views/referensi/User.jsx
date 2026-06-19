import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ nama: '', game_id: '', server: '', no_hp: '' });

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/api/transaksi/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (index) => {
    if (window.confirm('Yakin hapus data ini?')) {
      const updated = [...users];
      updated.splice(index, 1);
      setUsers(updated);
    }
  };

  const handleEdit = (user, index) => {
    setEditingUser(index);
    setFormData(user);
  };

  const handleSave = () => {
    const updated = [...users];
    updated[editingUser] = formData;
    setUsers(updated);
    setEditingUser(null);
    setFormData({ nama: '', game_id: '', server: '', nohp: '' });
  };

  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(search.toLowerCase()) ||
    user.game_id.toString().includes(search) ||
    user.server.toString().includes(search) ||
    user.no_hp?.toString().includes(search)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Customer</h2>

      <div className="mb-4 flex gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari nama / game ID / server / no hp"
            className="w-full px-10 py-2 border rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
             <th className="py-2 px-4 text-left">Aksi</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Game ID</th>
            <th className="py-2 px-4 text-left">Server</th>
            <th className="py-2 px-4 text-left">No HP</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              {editingUser === index ? (
                <>
                  <td className="py-2 px-4">
                    <input
                      value={formData.nama}
                      onChange={e => setFormData({ ...formData, nama: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      value={formData.game_id}
                      onChange={e => setFormData({ ...formData, game_id: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      value={formData.server}
                      onChange={e => setFormData({ ...formData, server: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      value={formData.no_hp}
                      onChange={e => setFormData({ ...formData, nohp: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={handleSave} className="text-green-600 font-semibold">Simpan</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(user, index)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="py-2 px-4">{user.nama}</td>
                  <td className="py-2 px-4">{user.game_id}</td>
                  <td className="py-2 px-4">{user.server}</td>
                  <td className="py-2 px-4">{user.nohp || '-'}</td>
                  
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
