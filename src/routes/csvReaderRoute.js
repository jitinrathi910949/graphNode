const express = require('express');

const router = express.Router();

const CsvReaderController = require('../controller/csvReaderController');

router.post('/upload/csv', CsvReaderController.uploadCsvFile)

router.get('/all', CsvReaderController.getAll)

module.exports = router;
