var express = require('express');
var router = express.Router();
const Product = require('../models/product.model');

// [GET] /api/v1/products 
// Tương ứng request: products và các query filters
router.get('/', async (req, res) => {
  try {
    let find = { deleted: false };

    // 1. Lọc theo title (includes - tìm kiếm gần đúng)
    if (req.query.title) {
      find.title = new RegExp(req.query.title, "i"); // "i" để không phân biệt hoa thường
    }

    // 2. Lọc theo slug (equal - khớp chính xác)
    if (req.query.slug) {
      find.slug = req.query.slug;
    }

    // 3. Lọc theo khoảng giá (minPrice & maxPrice)
    if (req.query.minPrice || req.query.maxPrice) {
      find.price = {};
      if (req.query.minPrice) find.price.$gte = parseInt(req.query.minPrice); // >= minPrice
      if (req.query.maxPrice) find.price.$lte = parseInt(req.query.maxPrice); // <= maxPrice
    }

    const products = await Product.find(find);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error: error.message });
  }
});

// [GET] /api/v1/products/:id
// Tương ứng request: products/:id (Lấy chi tiết sản phẩm)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ message: "ID không hợp lệ" });
  }
});

module.exports = router;