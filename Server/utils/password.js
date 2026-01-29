const bcrypt = require("bcrypt");

module.exports = {
    async hash(str) {
        return bcrypt.hash(str, 12);
    },

    async compare(str, hashed) {
        return bcrypt.compare(str, hashed);
    }
};
