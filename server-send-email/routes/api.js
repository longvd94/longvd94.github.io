const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const EMController = require('../controllers/EM.controller');
const checkBody = require('../middleware/checkBody');

router.post('/send', [upload.single('attachment'), checkBody], EMController.sendEmail);

module.exports = router;