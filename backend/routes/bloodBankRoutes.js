const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ==============================
// Add Blood Bank
// ==============================

router.post("/", (req, res) => {

    const {
        bank_name,
        manager_name,
        email,
        phone,
        city,
        capacity,
        address
    } = req.body;

    const sql = `
        INSERT INTO blood_banks
        (bank_name, manager_name, email, phone, city, capacity, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            bank_name,
            manager_name,
            email,
            phone,
            city,
            capacity,
            address
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Blood Bank Added Successfully"
            });

        }
    );

});

// ==============================
// Get All Blood Banks
// ==============================

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM blood_banks ORDER BY bank_id DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});

// ==============================
// Delete Blood Bank
// ==============================

router.delete("/:id", (req, res) => {

    const bankId = req.params.id;

    db.query(
        "DELETE FROM blood_inventory WHERE bank_id=?",
        [bankId],
        (err) => {

            if (err)
                return res.status(500).json(err);

            db.query(
                "DELETE FROM blood_banks WHERE bank_id=?",
                [bankId],
                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        success: true,
                        message: "Blood Bank Deleted Successfully"
                    });

                }
            );

        }
    );

});

module.exports = router;