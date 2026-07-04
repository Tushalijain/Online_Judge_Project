const Submission = require("../models/Submission");

//create submission
const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get individual submission
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete submission
const deleteSubmission = async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Submission deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createSubmission, getSubmissions, getSubmissionById, deleteSubmission};