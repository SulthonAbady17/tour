const express = require('express')
const router = express.Router()

const transportationController = require('../controllers/transportationController')

router.route('/')
    .get(transportationController.get)
    .post(transportationController.create)

router.route('/:id')
    .get(transportationController.find)
    .patch(transportationController.update)
    .delete(transportationController.delete)

module.exports = router