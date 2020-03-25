const router = require("express").Router();
const Category = require("../models/category");

//  POST - create new category
router.post("/categories/", async (req, res, next) => {
  try {
    const category = new Category();
    category.type = req.body.type;
    await category.save();
    res.json({
      success: true,
      message: "success new category saved"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - all categorys
router.get("/categories/", async (req, res, next) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - a single category
router.get("/categories/:id", async (req, res, next) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    res.json({
      success: true,
      category: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT (PATCH) - update single category data
router.put("/categories/:id", async (req, res, next) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          type: req.body.type
        }
      },
      { upsert: true }
    );
    res.json({
      success: true,
      updatedCategory: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE - a single category
router.delete("/categories/:id", async (req, res, next) => {
  try {
    let deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id
    });
    if (deletedCategory) {
      res.json({
        status: true,
        message: "category deleted"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
