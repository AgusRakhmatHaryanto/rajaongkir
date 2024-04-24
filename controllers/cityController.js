const Model = require("../models");
const { Op } = require("sequelize");
const City = Model.City;
const Province = Model.Province;
const axios = require("axios");
require("dotenv").config();

exports.InitAllDataCity = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.rajaongkir.com/starter/city",
      headers: {
        key: `${process.env.ONGKIR_KEY}`,
      },
    };

    const response = await axios.request(options);
    const data = response.data.rajaongkir.results;

    const cities = data.map((item) => ({
      id: item.city_id,
      name: item.type + " " + item.city_name,
      provinceId: item.province_id,
      type: item.type,
      postal_code: item.postal_code,
    }));

    for (const city of cities) {
      const existingCity = await City.findOne({
        where: {
          name: city.name,
        },
      });

      if (!existingCity) {
        await City.create(city);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Data city successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to create data city",
    });
  }
};

exports.getCityByIdWithProvince = async (req, res) => {
  try {
    const { name } = req.params;
    const city = await City.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Province,
          as: "province",
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: city,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to get city",
    });
  }
};
