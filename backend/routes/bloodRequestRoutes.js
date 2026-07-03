const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Get All Blood Requests
// ===================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM blood_requests
        ORDER BY request_id DESC
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});

// ===================================
// Add Blood Request
// ===================================

router.post("/", (req, res) => {

    const {
        patient_name,
        hospital_name,
        blood_group,
        units_required,
        city,
        contact,
        email,
        required_date,
        remarks
    } = req.body;

    const sql = `
        INSERT INTO blood_requests
        (
            patient_name,
            hospital_name,
            blood_group,
            units_required,
            city,
            contact,
            email,
            required_date,
            remarks
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            patient_name,
            hospital_name,
            blood_group,
            units_required,
            city,
            contact,
            email,
            required_date,
            remarks
        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Blood Request Submitted Successfully"

            });

        }

    );

});

// ===================================
// Delete Blood Request
// ===================================

router.delete("/:id", (req, res) => {

    const sql = `
        DELETE FROM blood_requests
        WHERE request_id = ?
    `;

    db.query(

        sql,

        [req.params.id],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Request Deleted Successfully"

            });

        }

    );

});

// ===================================
// Approve Request
// ===================================

router.put("/approve/:id", (req, res) => {

    const getRequestSql = `
        SELECT blood_group, units_required
        FROM blood_requests
        WHERE request_id = ?
    `;

    db.query(getRequestSql, [req.params.id], (err, requestResult) => {

        if (err)
            return res.status(500).json(err);

        if (requestResult.length === 0)
            return res.status(404).json({

                success: false,
                message: "Request Not Found"

            });

        const bloodGroup = requestResult[0].blood_group;
        const units = requestResult[0].units_required;

        const updateInventorySql = `
            UPDATE blood_inventory
            SET units_available = units_available - ?
            WHERE blood_group = ?
            AND units_available >= ?
            LIMIT 1
        `;

        db.query(

            updateInventorySql,

            [
                units,
                bloodGroup,
                units
            ],

            (err, inventoryResult) => {

                if (err)
                    return res.status(500).json(err);

                if (inventoryResult.affectedRows === 0) {

                    return res.json({

                        success: false,
                        message: "Insufficient Blood Units"

                    });

                }

                db.query(

                    "UPDATE blood_requests SET status='Approved' WHERE request_id=?",

                    [req.params.id],

                    (err) => {

                        if (err)
                            return res.status(500).json(err);

                        res.json({

                            success: true,
                            message: "Request Approved Successfully"

                        });

                    }

                );

            }

        );

    });

});

// ===================================
// Reject Request
// ===================================

router.put("/reject/:id", (req, res) => {

    db.query(

        "UPDATE blood_requests SET status='Rejected' WHERE request_id=?",

        [req.params.id],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "Request Rejected"

            });

        }

    );

});

module.exports = router;