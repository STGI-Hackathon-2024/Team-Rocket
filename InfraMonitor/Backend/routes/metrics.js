// Initiates the metrics route
import express from 'express';
const router = express.Router();
import getMetrics from '../controller/metricsController.js';

router.get('/', getMetrics);

export default router;