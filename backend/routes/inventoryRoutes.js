const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Get Blood Inventory
// ===================================

router.get("/", (req, res) => {

    const sql = `
        SELECT
            blood_inventory.inventory_id,
            blood_inventory.blood_group,
            blood_inventory.units_available,
            blood_inventory.expiry_date,
            blood_banks.bank_name,
            blood_banks.city
        FROM blood_inventory
        INNER JOIN blood_banks
        ON blood_inventory.bank_id = blood_banks.bank_id
        ORDER BY blood_inventory.inventory_id DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});

// ===================================
// Add Blood Inventory
// ===================================

router.post("/", (req, res) => {

    const {

        blood_group,
        units_available,
        expiry_date,
        bank_id

    } = req.body;

    const sql = `
        INSERT INTO blood_inventory
        (
            blood_group,
            units_available,
            expiry_date,
            bank_id
        )
        VALUES
        (?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            blood_group,
            units_available,
            expiry_date,
            bank_id
        ],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Blood Inventory Added Successfully"

            });

        }

    );

});

// ===================================
// Delete Inventory
// ===================================

router.delete("/:id", (req, res) => {

    db.query(

        "DELETE FROM blood_inventory WHERE inventory_id=?",

        [req.params.id],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true

            });

        }

    );

});

module.exports = router;