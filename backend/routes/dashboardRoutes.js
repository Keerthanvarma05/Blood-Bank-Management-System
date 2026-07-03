const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===================================
// Dashboard Statistics
// ===================================

router.get("/", (req, res) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM donors) AS totalDonors,
            (SELECT COUNT(*) FROM blood_banks) AS totalBloodBanks,
            (SELECT IFNULL(SUM(units_available),0) FROM blood_inventory) AS totalUnits,
            (SELECT COUNT(*) FROM blood_requests) AS totalRequests,
            (SELECT COUNT(*) FROM blood_requests WHERE status='Pending') AS pendingRequests,
            (SELECT COUNT(*) FROM blood_issues) AS totalIssues
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result[0]);

    });

});

module.exports = router;