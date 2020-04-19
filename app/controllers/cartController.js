
const { Cart } = require("../models/cart");
const { User } = require("../models/user");

module.exports.list = (req, res) => {              
	const user = req.user;
	User.findOne(user._id)
		.select("cart")
		.populate("cart.product")
		.then(cart => {
			res.send(cart);
        })
        .catch((err) => {
            res.json(err);
          })
}

module.exports.show = (req, res) => {
	const cartId = req.params.id;
	const cart = req.user.cart;
	cart.forEach(cartItem => {
		if (cartItem._id == cartId) {
			res.send(cartItem);
		}
	})
}
module.exports.create = (req, res) => {
	const body = req.body;
	const user = req.user;
	const cart = new Cart(body, user._id);
	let product = false;
	user.cart.map(productId => {
		if (productId.product == body.product) {
			product = true;
		}
	})
	if (product) {
		res.send({ statusText: "you allready added to cart" });
	} else {
		user.cart.push(cart);
		user
			.save()
			.then(user => {
				res.json({ statusText: "Added Sucessfully" });
			})
			.catch(err => {
				res.status(403).json({
					statusText: "You are not authorized to access this URL"
				})
			})
	}
}

module.exports.update = (req, res) => {
	const user = req.user;
	const body = req.body;
	const id = req.params.id;
	user.cart.forEach(cart => {
		if (cart._id == id) {
			cart.quantity = body.quantity;
		}
	})

	user.save()
		.then(user => {
			res.json({ statusText: "succefully Updated" });
		})
		.catch(err => {
			res.json(err);
		})
}
module.exports.destroy = (req, res) => {
	const user = req.user;
	const id = req.params.id;
	user.cart = user.cart.filter(cart => {
		return cart._id != id;
	})
	user.save().then(user => {
		res.json({ statusText: "succefuuly deleted" });
    })
    .catch(err => {
        res.json(err);
    })
}
