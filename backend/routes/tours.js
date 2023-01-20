const express = require('express')
const router = express.Router()

const tourController = require('../controllers/tourController')

router.route('/')
    .get(tourController.get)
    .post(tourController.create)

router.route('/:id')
    .get(tourController.find)
    .patch(tourController.update)
    .delete(tourController.delete)

module.exports = router