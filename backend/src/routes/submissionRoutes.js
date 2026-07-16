const express = require("express");

const router = express.Router();

const {
    createSubmission,
    getSubmissions
} = require("../controllers/submissionController");

router.get("/", getSubmissions);

router.post("/", createSubmission);

module.exports = router;