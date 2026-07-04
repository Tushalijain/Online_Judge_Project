const express = require("express");
const router = express.Router();

const {createProblem, getProblems, getProblemById, updateProblem, deleteProblem} = require("../controllers/problemController");

router.post("/", createProblem);       // CREATE
router.get("/", getProblems);          // READ ALL
router.get("/:id", getProblemById);    // READ ONE
router.put("/:id", updateProblem);     // UPDATE
router.delete("/:id", deleteProblem);  // DELETE

module.exports = router;