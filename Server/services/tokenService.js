const jwt = require("jsonwebtoken");
const { jwtSecret, tokenExpiry } = require("../config/env");

module.exports = {
    sign(user) {
        return jwt.sign(
            { id: user._id, email: user.email },
            jwtSecret,
            { expiresIn: tokenExpiry }
        );
    },

    verify(token) {
        return jwt.verify(token, jwtSecret);
    }
};
