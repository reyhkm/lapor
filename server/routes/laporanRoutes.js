const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');

router.get('/', laporanController.getAllLaporan);
router.post('/', laporanController.createLaporan);
router.get('/:id', laporanController.getLaporanById);
router.put('/:id', laporanController.updateLaporan);
router.delete('/:id', laporanController.deleteLaporan);

module.exports = router;