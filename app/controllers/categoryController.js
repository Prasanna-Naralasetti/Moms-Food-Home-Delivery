const Category = require("../models/Category");

module.exports.list = (req, res) => {
  Category.find()
    .then((categories) => {
        if (categories.length!=0){
            res.json(categories);
        }else{
            res.json([])
        }
      
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  const category = new Category(body);
  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
    Promise.all([Category.findById(id),FoodItem.find({catagory:id})])
    .then((values) => {
      res.json({category:values[0],
                 FoodItem:values[1]});
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    })
}

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};
