const express = require('express');
const crypto = require("crypto");
const router = express.Router();

router.post('/login', (req, res, next) => {
    res.cookie('session', crypto.randomUUID())
    res.send()
});

module.exports = router;
