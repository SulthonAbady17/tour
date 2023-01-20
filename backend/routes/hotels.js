const express = require('express');
const router = express.Router();
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/images')
//     }, 
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage })

const hotelController = require('../controllers/hotelController');

router.route('/')
    .get(hotelController.get)
    // .post(upload.single('photo'), hotelController.create);
    .post(hotelController.create);

router.route('/:id')
    .get(hotelController.find)
    .patch(hotelController.update)
    .delete(hotelController.delete);

module.exports = router;