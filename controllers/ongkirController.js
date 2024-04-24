const Model = require('../models');
const Province = Model.Province
const City = Model.City
const axios = require('axios');
const {Op} = require('sequelize')
require('dotenv').config()

exports.getOngkir = async (req, res) => {
    try {
        const { origin, destination, weight, courier } = req.body
        const checkCity = await City.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${origin}%`
                }
            }
        })

        if (!checkCity) {
            return res.status(404).json({
                status: 'fail',
                message: 'Origin city not found'
            })
        }

        const originId = checkCity.id

        const checkCity2 = await City.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${destination}%`
                }
            }
        })

        if (!checkCity2) {
            return res.status(404).json({
                status: 'fail',
                message: 'Destination city not found'
            })
        }

        const destinationId = checkCity2.id
        const originString = JSON.stringify(originId)
        const destinationString = JSON.stringify(destinationId)

        const myHeaders = new Headers()
        myHeaders.append('key', `${process.env.ONGKIR_KEY}`)

        const formData = new FormData()
        formData.append('origin', originString)
        formData.append('destination', destinationString)
        formData.append('weight', weight)
        formData.append('courier', courier)


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        }

        const response = await fetch('https://api.rajaongkir.com/starter/cost', requestOptions)

        const data = await response.json()

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 'fail',
            message: 'Failed to get ongkir'
        })
    }
}
