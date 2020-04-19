
const FoodItem = require("../models/FoodItems");

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
  console.log("itemImage", req.files.itemImage)
  const fooditem = new FoodItem(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available,
      isCod: req.body.isCod,
      category: req.body.category,
     itemImage: req.files.itemImage[0].path,
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
  const body = req.body;
  const id = req.params.id;
  FoodItem.findOneAndUpdate({ user: req.user._id, _id: id }, body,
    { new: true, runValidators: true })

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