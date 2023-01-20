const express = require('express')
const router = express.Router()

const tourGuideController = require('../controllers/tourGuideController')

router.route('/')
    .get(tourGuideController.get)
    .post(tourGuideController.create)

router.route('/:id')
    .get(tourGuideController.find)
    .patch(tourGuideController.update)
    .delete(tourGuideController.delete)

module.exports = router