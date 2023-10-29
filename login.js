const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../sqllib"); // Import your database module
const router = express.Router();

// GET request to render the login form
router.get("/login", (req, res) => {
  res.render("Login"); 
});

// POST request to process the login
router.post("/login", (req, res) => {
  console.log("1")
  const { Enrollment_Number, Passwords } = req.body; 
  console.log("password from user",Passwords)

  // Retrieve the user's data from the database
  db.query("SELECT * FROM users WHERE Enrollment_Number = ?", [Enrollment_Number], (err, results) => {
    if (err) {
      
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = results[0];
    console.log(user.Passwords)
    bcrypt.compare(Passwords, user.Passwords, (compareErr, isMatch) => {
      if (compareErr || !isMatch) {
        // Passwords do not match
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        
        res.render("dashboard"); // Replace "dashboard" with the name of your dashboard view/template
      }
    });
  });
});

module.exports = router;
