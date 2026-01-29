module.exports = {
    isEmail(str) {
        return /\S+@\S+\.\S+/.test(str);
    },

    isStrongPassword(str) {
        return str.length >= 8;
    }
};
