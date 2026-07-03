const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Save Contact Message
// ===================================

router.post("/", (req, res) => {

    const {
        full_name,
        email,
        subject,
        message
    } = req.body;

    const sql = `
        INSERT INTO contact_messages
        (
            full_name,
            email,
            subject,
            message
        )
        VALUES
        (?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            full_name,
            email,
            subject,
            message
        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Message Sent Successfully"

            });

        }

    );

});

module.exports = router;