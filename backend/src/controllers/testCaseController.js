const TestCase = require("../models/TestCase");

//create test case
const createTestCase = async (req, res) => {
  try {
    const testCase = await TestCase.create(req.body);
    res.status(201).json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all test cases
const getTestCases = async (req, res) => {
  try {
    const testCases = await TestCase.find();
    res.json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get individual
const getTestCaseById = async (req, res) => {
  try {
    const testCase = await TestCase.findById(req.params.id);

    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    res.json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update testcase
const updateTestCase = async (req, res) => {
  try {
    const testCase = await TestCase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete
const deleteTestCase = async (req, res) => {
  try {
    await TestCase.findByIdAndDelete(req.params.id);
    res.json({ message: "Test case deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createTestCase, getTestCases, getTestCaseById, updateTestCase, deleteTestCase};