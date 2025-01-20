const Laporan = require('../models/Laporan');

exports.createLaporan = (req, res) => {
  const { lokasi, deskripsi, pelapor } = req.body;
  const foto = req.file ? req.file.path : null;

  const newLaporan = {
    lokasi,
    deskripsi,
    foto,
    pelapor,
  };

  Laporan.create(newLaporan, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error creating data' });
      return;
    }
    res.status(201).json({ id: result.insertId, ...newLaporan });
  });
};
exports.getAllLaporan = (req, res) => {
  const searchQuery = req.query.search || '';

  const query = `
    SELECT *
    FROM laporan
    WHERE lokasi LIKE ? OR deskripsi LIKE ?
  `;

  const queryParams = [`%${searchQuery}%`, `%${searchQuery}%`];

  Laporan.getAll(query, queryParams, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving data' });
      return;
    }
    res.json(results);
  });
};
exports.getLaporanById = (req, res) => {
    const id = req.params.id;
    Laporan.findById(id, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            return;
        }
        if (result.length === 0) {
            res.status(404).send({ message: 'Data not found' });
            return;
        }
        res.json(result[0]);
    });
};

exports.updateLaporan = (req, res) => {
    const id = req.params.id;
    const updatedLaporan = req.body;
    Laporan.update(id, updatedLaporan, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating data' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Data not found' });
            return;
        }
        res.json({ id: parseInt(id), ...updatedLaporan });
    });
};

exports.deleteLaporan = (req, res) => {
  const id = req.params.id;
  Laporan.delete(id, (err, result) => {
      if (err) {
          res.status(500).send({ message: 'Error deleting data' });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Data not found' });
          return;
      }
      res.status(200).send({ message: 'Data deleted successfully' });
  });
};