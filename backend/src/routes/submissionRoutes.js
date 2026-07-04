const express = require("express");
const router = express.Router();

const {createSubmission, getSubmissions, getSubmissionById, deleteSubmission} = require("../controllers/submissionController");

router.post("/", createSubmission);
router.get("/", getSubmissions);
router.get("/:id", getSubmissionById);
router.delete("/:id", deleteSubmission);

module.exports = router;