import React from 'react';

const LaporanItem = ({ laporan }) => {
  const imageUrl = laporan.foto ? `http://localhost:5000/${laporan.foto}` : '';
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
      {imageUrl && (
        <img src={imageUrl} alt="Foto Laporan" className="w-full h-40 object-cover rounded-t-lg mb-4" />
      )}
      <div className="mt-2">
        <p className="text-gray-800 font-semibold">
          <span className="font-bold">Lokasi:</span> {laporan.lokasi}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Pelapor:</span> {laporan.pelapor || '-'}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-bold">Deskripsi:</span> {laporan.deskripsi}
        </p>
        <p className="text-sm mt-2">
          Status: <span className={`font-semibold ${
            laporan.status === 'belum diproses'
              ? 'text-red-500'
              : laporan.status === 'sedang diproses'
              ? 'text-yellow-500'
              : 'text-green-500'
          }`}>{laporan.status}</span>
        </p>
      </div>
    </div>
  );
};

export default LaporanItem;