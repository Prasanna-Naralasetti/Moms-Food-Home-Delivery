const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { FoodItem } = require("../models/FoodItems");
aws.config.update({
  secretAccessKey: process.env.SECRETACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEYID,
  region: "us-east-1"
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "food-delivery",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
});

module.exports.list = (req, res) => {
  Product.find()
    .populate("category")
    .then(products => {
      res.send(products);
    });
}
module.exports.show = (req, res) => {
  FoodItem.findById(req.params.id)
    .populate("category")
    .then(fooditem => {
      res.send(fooditem);
    })

    .catch(err => {
      res.send(err);
    });
}

module.exports.post = (req, res) => {
  const user = req.user;
  const fooditem = new FoodItem(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available,
      isCod: req.body.isCod,
      category: req.body.category,
      imageUrl: req.file.location
    },
    req.user._id
  );

  fooditem
    .save()
    .then(fooditem => {
      res.json(fooditem);
    })
    .catch(err => {
      res.status(500).json({ statusText: "internal server error" });
    });
}

module.exports.update = (req, res) => {
  const user = req.user._id;
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        available: req.body.available,
        isCod: req.body.isCod,
        category: req.body.category,
        imageUrl: req.file.location
      }
    },
    {
      new: true
    }
  )
    .then(fooditem => {
      res.json(fooditem);
    })
    .catch(err => {
      res.status(500).json({ statusText: "internal server error" });
    });
}
module.exports.destroy = (req, res) => {
  const user = req.user;
  FoodItem.findOneAndDelete({ _id: req.params.id }, req.user._id)
    .then(fooditem => {
      res.json(fooditem);
    })
    .catch(err => {
      res.status(500).json({ statusText: "internal server error" });
    });
}