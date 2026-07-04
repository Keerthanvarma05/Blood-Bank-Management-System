require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// Database Connection
// ===============================

require("./config/db");

// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const bloodIssueRoutes = require("./routes/bloodIssueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/bloodrequests", bloodRequestRoutes);
app.use("/api/issues", bloodIssueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
    res.send("Blood Bank Backend Running Successfully");
});

// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});