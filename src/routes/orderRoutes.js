const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.post("/order", controller.createOrder);
router.get("/order/:id", controller.getOrderById);
router.get("/order/list", controller.listOrders);
router.put("/order/:id", controller.updateOrder);
router.delete("/order/:id", controller.deleteOrder);

module.exports = router;