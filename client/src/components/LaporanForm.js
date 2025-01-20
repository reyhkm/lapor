import React, { useState } from 'react';
import axios from 'axios';

const LaporanForm = () => {
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState(null); // State untuk file foto
  const [fotoUrl, setFotoUrl] = useState(''); // State untuk preview URL foto
  const [pelapor, setPelapor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFoto(selectedFile);

    // Preview image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFotoUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lokasi || !deskripsi) {
      setError('Lokasi dan deskripsi harus diisi!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('lokasi', lokasi);
      formData.append('deskripsi', deskripsi);
      formData.append('pelapor', pelapor);
      if (foto) {
        formData.append('foto', foto);
      }

      const response = await axios.post('http://localhost:5000/api/laporan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setLokasi('');
        setDeskripsi('');
        setFoto(null);       // Reset file foto
        setFotoUrl('');    // Reset preview URL
        setPelapor('');
        setError('');

        // Hilangkan pesan sukses setelah 3 detik
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError('Gagal membuat laporan.');
      }
    } catch (error) {
      console.error('Error creating report:', error);
      setError('Gagal membuat laporan.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lapor Masalah Publik</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Buat Laporan Baru</h2>
        <p className="text-gray-600 mb-4">
          Laporkan masalah yang Anda temui di sekitar Anda, seperti jalan rusak,
          lampu jalan mati, atau tumpukan sampah.
        </p>

        {/* Notifikasi Sukses */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Laporan berhasil dibuat!
          </div>
        )}

        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="lokasi"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="deskripsi"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pelapor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama Anda (Opsional)
            </label>
            <input
              type="text"
              id="pelapor"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={pelapor}
              onChange={(e) => setPelapor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foto" className="block text-gray-700 text-sm font-bold mb-2">
              Foto
            </label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              onChange={handleFileChange}
            />
            {fotoUrl && (
              <img src={fotoUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaporanForm;
