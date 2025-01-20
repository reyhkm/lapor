import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LaporanItem from './LaporanItem';

const LaporanList = () => {
  const [laporanList, setLaporanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/laporan'); // URL tanpa parameter pencarian
        setLaporanList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar useEffect hanya dijalankan sekali saat komponen di-mount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Laporan</h1>
      <p className="text-gray-600 mb-4">
        Berikut adalah daftar laporan yang telah dikirimkan oleh masyarakat.
        Anda dapat melihat status laporan dan detailnya.
      </p>

      {isLoading ? (
        <p>Loading...</p>
      ) : laporanList.length === 0 ? (
        <p>Belum ada laporan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {laporanList.map((laporan) => (
            <LaporanItem key={laporan.id} laporan={laporan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LaporanList;