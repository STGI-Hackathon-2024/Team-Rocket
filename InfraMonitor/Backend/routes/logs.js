const express = require('express');
const router = express.Router();

const getLogs = require('../controller/logsController');    

router.get('/', getLogs);

module.exports = router;