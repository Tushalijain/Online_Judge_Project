const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

//Problem
const problemRoutes = require("./routes/problemRoutes");
app.use("/api/problems", problemRoutes);

//Submission
const submissionRoutes = require("./routes/submissionRoutes");
app.use("/api/submissions", submissionRoutes);

//Test cases
const testCaseRoutes = require("./routes/testCaseRoutes");
app.use("/api/testcases", testCaseRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});