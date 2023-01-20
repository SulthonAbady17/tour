const { Router } = require("express");
const router = Router();

const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.index);
router.route("/:id")
    .get(transactionController.find)
    .patch(transactionController.update)
    .delete(transactionController.delete)

module.exports = router;
