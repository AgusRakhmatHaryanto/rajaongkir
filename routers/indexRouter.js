const express = require('express');
const router = express.Router();
const ProvinceRouter = require('./provinceRouter');
const CityRouter = require('./cityRouter');
const ongkirRouter = require('./ongkirRouter');
require('dotenv').config();
const api = process.env.API

router.use(`/${api}/province`, ProvinceRouter);
router.use(`/${api}/city`, CityRouter);
router.use(`/${api}/ongkir`, ongkirRouter);


module.exports = router