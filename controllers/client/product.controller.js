const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  try {
    // Mặc định lọc các sản phẩm chưa xóa và đang hoạt động
    let find = {
      deleted: false,
      status: "active"
    };

    // 1. Lọc theo title (Includes - Tìm kiếm gần đúng)
    if (req.query.title) {
      // "i" giúp tìm kiếm không phân biệt hoa thường
      find.title = new RegExp(req.query.title, "i");
    }

    // 2. Lọc theo slug (Equal - Khớp chính xác)
    if (req.query.slug) {
      find.slug = req.query.slug;
    }

    // 3. Lọc theo khoảng giá (minPrice & maxPrice)
    if (req.query.minPrice || req.query.maxPrice) {
      find.price = {};
      if (req.query.minPrice) {
        find.price.$gte = parseInt(req.query.minPrice); // Lớn hơn hoặc bằng
      }
      if (req.query.maxPrice) {
        find.price.$lte = parseInt(req.query.maxPrice); // Nhỏ hơn hoặc bằng
      }
    }

    // Thực hiện truy vấn
    const products = await Product.find(find).sort({ position: "desc" });

    // Trả về kết quả
    res.render("client/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products
    });
  } catch (error) {
    res.redirect("/products");
  }
};

// [GET] /products/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false,
      status: "active"
    });

    if (product) {
      res.render("client/pages/products/detail", {
        pageTitle: product.title,
        product: product
      });
    } else {
      res.redirect("/products");
    }
  } catch (error) {
    res.redirect("/products");
  }
};