const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const testCaseRoutes = require("./routes/testCaseRoutes");
const executeRoutes = require("./routes/executeRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "https://localhost:5173",
        credentials: true
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/testcases", testCaseRoutes);
app.use("/api/execute", executeRoutes);

module.exports = app;