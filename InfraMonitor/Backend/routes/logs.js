import express from 'express';
const router = express.Router();
import getLogs from '../controller/logsController.js';

router.get('/', getLogs);

export default router;