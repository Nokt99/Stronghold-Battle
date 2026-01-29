module.exports = {
    async send(to, subject, body) {
        console.log(`Email → ${to}: ${subject}`);
        return true;
    }
};
