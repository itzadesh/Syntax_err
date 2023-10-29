const express = require("express");
const db = require("../sqllib");
const router = express.Router();

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/logout");
});

module.exports = router;