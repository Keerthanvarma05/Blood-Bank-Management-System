const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Get All Blood Issues
// ===================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM blood_issues
        ORDER BY issue_id DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});

// ===================================
// Add Blood Issue
// ===================================

router.post("/", (req, res) => {

    const {
        patient_name,
        hospital_name,
        blood_group,
        units_issued,
        issue_date,
        issued_by
    } = req.body;

    const sql = `
        INSERT INTO blood_issues
        (
            patient_name,
            hospital_name,
            blood_group,
            units_issued,
            issue_date,
            issued_by
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            patient_name,
            hospital_name,
            blood_group,
            units_issued,
            issue_date,
            issued_by
        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Blood Issued Successfully"

            });

        }

    );

});

// ===================================
// Delete Blood Issue
// ===================================

router.delete("/:id", (req, res) => {

    db.query(

        "DELETE FROM blood_issues WHERE issue_id=?",

        [req.params.id],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Record Deleted Successfully"

            });

        }

    );

});

module.exports = router;