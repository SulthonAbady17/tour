var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.get('/', userController.get);

router.route('/:id')
  .get(userController.find)
  .patch(userController.update)
  .delete(userController.delete);

router.route('/:id/transactions')
  .get(userController.getTransactions)
  .post(userController.createTransaction);

module.exports = router;
