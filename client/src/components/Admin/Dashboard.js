import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [laporanList, setLaporanList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/laporan');
        setLaporanList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/laporan/${id}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setLaporanList((prevLaporanList) =>
          prevLaporanList.map((laporan) =>
            laporan.id === id ? { ...laporan, status: newStatus } : laporan
          )
        );
      } else {
        console.error('Error updating status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/laporan/${id}`);
      if (response.status === 200) {
        setLaporanList(laporanList.filter((laporan) => laporan.id !== id));
      } else {
        console.error('Error deleting laporan');
      }
    } catch (error) {
      console.error('Error deleting laporan:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Lokasi</th>
            <th className="px-4 py-2">Deskripsi</th>
            <th className="px-4 py-2">Pelapor</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {laporanList.map((laporan) => (
            <tr key={laporan.id}>
              <td className="border px-4 py-2">{laporan.id}</td>
              <td className="border px-4 py-2">{laporan.lokasi}</td>
              <td className="border px-4 py-2">{laporan.deskripsi}</td>
              <td className="border px-4 py-2">{laporan.pelapor || '-'}</td>
              <td className="border px-4 py-2">
                <select
                  value={laporan.status}
                  onChange={(e) => handleStatusChange(laporan.id, e.target.value)}
                  className={`bg-white border px-2 py-1 rounded ${
                    laporan.status === 'belum diproses'
                      ? 'border-red-500'
                      : laporan.status === 'sedang diproses'
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  }`}
                >
                  <option value="belum diproses">Belum Diproses</option>
                  <option value="sedang diproses">Sedang Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(laporan.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;