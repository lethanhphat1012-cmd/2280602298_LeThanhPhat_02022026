const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");

// Đường dẫn danh sách (có kèm query)
router.get("/", controller.index);

// Đường dẫn chi tiết theo ID
router.get("/:id", controller.detail);

module.exports = router;