const { Router } = require('express');
const router = Router();

const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/forgot', authController.forgot);
router.post('/reset', authController.reset)

module.exports = router;