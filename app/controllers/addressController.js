
const { Address } = require("../models/address");
const { User } = require("../models/user");
module.exports.list = (req, res) => {
	const user = req.user;
	User.findOne(user._id)
		.select("address")
		.then(address => {
			if (user.address.length != 0) {
				res.json(user.address);
			} else {
				res.json({ statusText: "Please add your address" });
			}
		})
		.catch(err => {
			res.json(err);
		});
}
module.exports.show = (req, res) => {
	const addressId = req.params.id;
	const address = req.user.address;

	address.forEach(addressItem => {
		if (addressItem._id == addressId) {
			res.json(addressItem);
		}
	});
}
module.exports.create = (req, res) => {
	const user = req.user;
	const body = req.body;
	const address = new Address(body, user._id);
	user.address.push(address);
	user
		.save()
		.then(user => {
			res.json({ statusText: "Added Address succefuuly" });
		})
		.catch(err => {
			res.json(err);
		});
}

module.exports.update = (req, res) => {
	const user = req.user;
	const body = req.body;
	const id = req.params.id;
	user.address.forEach(address => {
		if (address._id == id) {
			address.fullname = body.fullname;
			address.mobile = body.mobile;
			address.city = body.city;
			address.street = body.street;
			address.street = body.street;
			address.landmark = body.landmark;
			address.postalCode = body.postalCode;
		}
	});
	user
		.save()
		.then(user => {
			res.json({ statusText: "Updated Address succefuuly" });
		})
		.catch(err => {
			res.json(err);
		});
}
module.exports.destroy = (req, res) => {
	const user = req.user;
	const id = req.params.id;
	user.address = user.address.filter(address => {
		return address._id != id;
	});
	user.save().then(user => {
		res.json({ statusText: "succefuuly deleted" });
	});
}
