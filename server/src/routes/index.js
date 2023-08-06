const express = require('express');
const router = express.Router();

router.use('/api', require("./chat"));

module.exports = router;
