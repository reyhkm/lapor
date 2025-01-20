import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State untuk pesan sukses
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Username dan password harus diisi!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setSuccessMessage('Login berhasil!'); // Set pesan sukses

                // Redirect ke /admin setelah 1 detik
                setTimeout(() => {
                    navigate('/admin');
                }, 500);
            } else {
                setError('Username atau password salah!');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Terjadi kesalahan saat login.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 lg:w-1/3">
                <p className="text-gray-600 mb-4">
                    Masukkan username dan password Anda untuk masuk ke dashboard admin.
                </p>

                {/* Tampilkan pesan sukses jika ada */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Tampilkan pesan error jika ada */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;