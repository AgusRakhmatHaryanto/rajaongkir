const express = require('express');
const ongkirController = require('../controllers/ongkirController')

const router = express.Router();

router.post('/', ongkirController.getOngkir);

module.exports = router