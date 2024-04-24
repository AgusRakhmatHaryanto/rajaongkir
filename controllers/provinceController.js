
const { Op } = require("sequelize");
const Model = require("../models");
const Province = Model.Province;
const axios = require("axios");
require("dotenv").config();

exports.initAllDataProvince = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.rajaongkir.com/starter/province",
      qs: {},
      headers: {
        key: `${process.env.ONGKIR_KEY}`,
      },
    };

    const response = await axios.request(options);
    const data = response.data.rajaongkir.results;

    const provinces = data.map((item) => ({
      id: item.province_id,
      name: item.province,
    }));

    for (const province of provinces) {
      const existingProvince = await Province.findOne({
        where: {
          name: province.name,
        },
      });

      if (!existingProvince) {
        await Province.create(province);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Data province has been initialized",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to initialize data province",
    });
  }
};

exports.getProvinceByName = async (req, res) => {
  try {
    const { name } = req.params;
    const province = await Province.findOne({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        }
    });
    res.status(200).json({
      status: "success",
      data: province,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to get province",
    });
  }
}

exports.getAllProvince = async (req, res) => {
  try {
    const provinces = await Province.findAll();
    res.status(200).json({
      status: "success",
      data: provinces,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to get provinces",
    });
  }
}