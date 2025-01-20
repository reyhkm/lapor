const connection = require('../config');

const Laporan = {
  getAll: (query, queryParams, callback) => {
    connection.query(query, queryParams, callback);
  },
  create: (newLaporan, callback) => {
    connection.query('INSERT INTO laporan SET ?', newLaporan, callback);
  },
  findById: (id, callback) => {
    connection.query('SELECT * FROM laporan WHERE id = ?', [id], callback);
  },
  update: (id, updatedLaporan, callback) => {
    connection.query('UPDATE laporan SET ? WHERE id = ?', [updatedLaporan, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM laporan WHERE id = ?', [id], callback);
  },
};

connection.query(`
  CREATE TABLE IF NOT EXISTS laporan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    foto VARCHAR(255),
    status ENUM('belum diproses', 'sedang diproses', 'selesai') DEFAULT 'belum diproses',
    pelapor VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating laporan table:', err);
  } else {
    console.log('Laporan table created or already exists.');
  }
});

module.exports = Laporan;