"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.default = (req, res, next) => {
    if (req.path === "/user/signin" ||
        req.path === "/user/signup" ||
        req.path === "/user/verify") {
        return next();
    }
    const token = "token" in req.headers ? req.headers.token : null;
    if (token) {
        utils_1.verifyJWTToken(token)
            .then((user) => {
            if (user) {
                req.user = user.data._doc;
            }
            next();
        })
            .catch(() => {
            res.status(403).json({ message: "Invalid auth token provided." });
        });
    }
    else {
        res.status(404).send({ msg: "No token provided" });
    }
};
//# sourceMappingURL=checkAuth.js.map