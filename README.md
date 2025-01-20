
## Instalasi

### Prasyarat

*   Node.js dan npm: [https://nodejs.org/](https://nodejs.org/)
*   MySQL: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
*   Git: [https://git-scm.com/](https://git-scm.com/)

### Langkah-langkah

1. **Clone Repositori:**

    ```bash
    git clone https://github.com/reyhkm/lapor.git
    cd lapor-masalah
    ```

2. **Install Dependensi:**

    *   **Backend:**

        ```bash
        cd server
        npm install
        ```

    *   **Frontend:**

        ```bash
        cd ../client
        npm install
        ```

3. **Konfigurasi Database:**

    *   Buat database MySQL dengan nama `lapor_masalah_db`.
    *   Ubah konfigurasi database di `server/config.js` sesuai dengan pengaturan MySQL Anda (username, password, host).

4. **Jalankan Aplikasi:**

    *   **Backend:**

        ```bash
        cd ../server
        npm start
        ```

    *   **Frontend:**

        ```bash
        cd ../client
        npm start
        ```

    *   Buka browser dan kunjungi `http://localhost:3000`.

## Penggunaan

### User (Masyarakat)

1. Buka halaman utama `http://localhost:3000` atau `http://localhost:3000/lapor` (jika sudah diubah di `App.js`).
2. Untuk melapor, klik menu "Lapor Masalah"
3. Isi formulir laporan (lokasi, deskripsi, dan nama Anda (opsional)).
4. Klik tombol "Kirim Laporan".
5. Untuk melihat daftar laporan, klik menu "Daftar Laporan".

### Admin

1. Buka halaman login admin `http://localhost:3000/admin/login`.
2. Masukkan username `admin` dan password `password`. **(Penting: Segera ubah username dan password default ini untuk keamanan!)**
3. Setelah berhasil login, Anda akan diarahkan ke dashboard admin.
4. Anda dapat melihat daftar laporan, mengubah status laporan, dan menghapus laporan.

## Deployment

Untuk mendeploy aplikasi ini ke production, Anda perlu:

1. **Build Frontend:**

    ```bash
    cd client
    npm run build
    ```

    Ini akan membuat folder `client/build` yang berisi file-file static untuk frontend.

2. **Konfigurasi Backend untuk Serving Static Files:**

    *   Di `server/server.js`, tambahkan kode berikut untuk men-serve file static dari folder `client/build`:

        ```javascript
        // ... (kode lain di server.js)

        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, '../client/build')));

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/build/index.html'));
        });

        // ... (kode lain di server.js)
        ```

3. **Deploy ke Server:**
    *   Anda bisa men-deploy aplikasi ini ke berbagai layanan hosting seperti Heroku, DigitalOcean, AWS, dan lain-lain.
    *   Pastikan server Anda sudah terinstall Node.js dan MySQL.
    *   Upload semua file dan folder di proyek Anda ke server.
    *   Install dependensi di server (`npm install` di folder `server` dan `client`).
    *   Konfigurasi environment variables di server (untuk database, port, dll.).
    *   Jalankan aplikasi di server menggunakan `npm start` atau process manager seperti PM2.

4. **Konfigurasi Database:**
    *   Buat database MySQL di server production Anda.
    *   Import skema database dari file `lapor_masalah_db.sql` (jika ada) atau jalankan perintah `CREATE TABLE` yang ada di `server/models/Laporan.js` untuk membuat tabel `laporan`.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

---
