import express from "express";
import { getLogs } from '../controller/logsController.js'

const router = express.Router();

// Get logs endpoint
router.get('/', getLogs);

export default router;
