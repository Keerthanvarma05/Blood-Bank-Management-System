const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Add Donor
// ===================================

router.post("/", (req, res) => {

    const {
        full_name,
        age,
        gender,
        blood_group,
        phone,
        email,
        city,
        address,
        last_donation
    } = req.body;

    const sql = `
        INSERT INTO donors
        (
            full_name,
            age,
            gender,
            blood_group,
            phone,
            email,
            city,
            address,
            last_donation
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            full_name,
            age,
            gender,
            blood_group,
            phone,
            email,
            city,
            address,
            last_donation
        ],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Donor Added Successfully"

            });

        }

    );

});

// ===================================
// Get All Donors
// ===================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM donors
        ORDER BY donor_id DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});

// ===================================
// Update Donor
// ===================================

router.put("/:id", (req, res) => {

    const {
        full_name,
        age,
        gender,
        blood_group,
        phone,
        email,
        city,
        address,
        last_donation
    } = req.body;

    const sql = `
        UPDATE donors
        SET
            full_name = ?,
            age = ?,
            gender = ?,
            blood_group = ?,
            phone = ?,
            email = ?,
            city = ?,
            address = ?,
            last_donation = ?
        WHERE donor_id = ?
    `;

    db.query(

        sql,

        [
            full_name,
            age,
            gender,
            blood_group,
            phone,
            email,
            city,
            address,
            last_donation,
            req.params.id
        ],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Donor Updated Successfully"

            });

        }

    );

});

// ===================================
// Delete Donor
// ===================================

router.delete("/:id", (req, res) => {

    const sql = `
        DELETE FROM donors
        WHERE donor_id = ?
    `;

    db.query(

        sql,

        [req.params.id],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Donor Deleted Successfully"

            });

        }

    );

});

module.exports = router;