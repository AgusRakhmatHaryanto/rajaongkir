const express = require('express');
const router = express.Router();
const CityController = require('../controllers/cityController');

router.post('/init', CityController.InitAllDataCity);

router.get('/:name', CityController.getCityByIdWithProvince);

module.exports = router