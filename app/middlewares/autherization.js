const { authenticateUser } = require("../middlewares/authentication");
function autherizationByUser(req, res, next) {
    if (authenticateUser) {
        req.user.role.map(role => {
            if (role === "admin") {
                next();
            } else if (role === "user") {
                if (req.url === "/fooditems") {
                    if (req.method === "GET") {
                        next();
                    } else {
                        res.status(403).send({
                            notice: "You are not authorized to access this route"
                        });
                    }
                }
                if (req.url === "/category") {
                    if (req.method === "GET") {
                        next();
                    } else {
                        res.status(403).send({
                            notice: "You are not authorized to access this route"
                        });
                    }
                }
            }
        });
    }
}
module.exports = { autherizationByUser };