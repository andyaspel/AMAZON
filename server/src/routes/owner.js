const router = require("express").Router();
const fs = require("fs-extra");

const Owner = require("../models/owner");
const upload = require("../middleware/upload-owner");

//  POST - create new owner
router.post("/owners/", upload, async (req, res, next) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.filename;
    await owner.save();
    res.json({
      success: true,
      message: "success new owner saved"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - all owners
router.get("/owners/", async (req, res, next) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - a single owner
router.get("/owners/:id", async (req, res, next) => {
  try {
    let owner = await Owner.findOne({ _id: req.params.id });
    res.json({
      success: true,
      owner: owner
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT (PATCH) - update single owner data
router.put("/owners/:id", upload, async (req, res, next) => {
  try {
    let owner = await Owner.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          about: req.body.about,
          photo: req.file.filename
        }
      },
      { upsert: true }
    );
    let file = product.photo;
    delphoto(file);
    res.json({
      success: true,
      updatedOwner: owner
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
// DELETE - a single owner
router.delete("/owners/:id", async (req, res, next) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    let file = product.photo;
    delphoto(file);
    let deletedOwner = await Owner.findOneAndDelete({ _id: req.params.id });
    if (deletedOwner) {
      res.json({
        status: true,
        message: "owner deleted"
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
  const path = `../admin/static/owners/${file}`;
  fs.unlink(path, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = router;
