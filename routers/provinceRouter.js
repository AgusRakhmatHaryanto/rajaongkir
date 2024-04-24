const express = require('express');
const ProvinceController = require('../controllers/provinceController');
const router = express.Router();

router.post('/init', ProvinceController.initAllDataProvince);
router.get('/:name', ProvinceController.getProvinceByName);
router.get('/', ProvinceController.getAllProvince);

module.exports = router