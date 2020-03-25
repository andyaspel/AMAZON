const router = require("express").Router();
const fs = require("fs-extra");

const Product = require("../models/product");
const upload = require("../middleware/upload-product");

//  POST - create new product
router.post("/products/", upload, async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.photo = req.file.filename;
    product.stockQuantity = req.body.stockQuantity;
    product.rating = req.body.rating;
    product.photoMeta = req.file;
    await product.save();
    console.log(`log-post ${product.photo}`);
    res.json({
      success: true,
      message: "success new product saved"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - all products
router.get("/products/", async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT (PATCH) - update single product data
router.put("/products/:id", upload, async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.categoryID,
          owner: req.body.ownerID,
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          photo: req.file.filename,
          photoMeta: req.file,
          stockQuantity: req.body.stockQuantity,
          rating: req.body.rating
        }
      },
      { upsert: true }
    );
    let file = product.photo;
    delphoto(file);
    res.json({
      success: true,
      updatedProduct: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE - a single product
router.delete("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    let file = product.photo;
    delphoto(file);
    let deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id
    });
    if (deletedProduct) {
      await Product.findOneAndDelete({
        _id: req.params.id
      });
      console.log(`log-del ${file}`);
      res.json({
        status: true,
        message: "product deleted"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

function delphoto(file) {
  const path = `../admin/static/products/${file}`;
  fs.unlink(path, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = router;
