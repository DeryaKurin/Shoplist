const express = require("express");
const router = express.Router();
const validation = require("./validation");

const itemController = require("../controllers/itemController");

router.post("/lists/:listId/items/create", validation.validateItems, itemController.create);
router.post("/lists/:listId/items/:id/update", validation.validateItems, itemController.update);
router.post("/lists/:listId/items/:id/destroy", itemController.delete);

module.exports = router;
