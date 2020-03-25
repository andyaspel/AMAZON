const path = require("path");
const multer = require('multer');

// set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../admin/static/products');
  },
  filename: (req, file, cb) => {
      cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("photo");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = upload;