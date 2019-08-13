const express = require("express");
const router = express.Router();
const validation = require("./validation");

const listController = require("../controllers/listController")

router.get("/lists", listController.index);
// router.get("/lists/new", listController.index);
router.post("/lists/create", validation.validateLists, listController.create);
router.get("/lists/:id", listController.show);
router.post("/lists/:id/destroy", listController.destroy);

module.exports = router;
