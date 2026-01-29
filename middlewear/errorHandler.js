module.exports = function (err, req, res, next) {
    console.error("Backend Error:", err);
    res.status(500).json({ error: "Internal server error" });
};
