// Initiates the metrics route
const express = require('express');
const router = express.Router();

const getMetrics = require('../controller/metricsController');

router.get('/', getMetrics);

module.exports = router;