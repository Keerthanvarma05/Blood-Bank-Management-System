const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {

    const { full_name, email, password, role } = req.body;

    const sql = `
        INSERT INTO users (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [full_name, email, password, role],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "User Registered Successfully"
            });

        }
    );

});
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            user: results[0]
        });

    });

});
module.exports = router;