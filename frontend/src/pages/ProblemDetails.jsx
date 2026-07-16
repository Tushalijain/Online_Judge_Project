import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    try {
      const response = await api.get(`/problems/${id}`);
      setProblem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const runCode = async () => {
    try {
      setOutput("Running...");

      const response = await fetch(
        "http://localhost:5000/api/compiler/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            code,
            input: customInput,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(data.message || "Execution Failed");
      }
    } catch (error) {
      console.error(error);
      setOutput("Unable to connect to the server.");
    }
  };
const submitCode = async () => {
  try {
    setOutput("Submitting...");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOutput("Please login first.");
      return;
    }

    const response = await api.post("/submissions", {
      userId: user._id,
      problemId: id,
      language,
      code,
    });

    if (response.data.success) {
      setOutput(
        `Verdict: ${response.data.submission.verdict}
Execution Time: ${response.data.submission.executionTime} ms`
      );
    } else {
      setOutput("Submission Failed");
    }
  } catch (error) {
    console.error(error);
    setOutput(error.response?.data?.message || "Submission Failed");
  }
};

  if (!problem) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-4xl font-bold mb-6">{problem.title}</h1>

        <h2 className="text-xl font-semibold mb-2">
          Problem Statement
        </h2>

        <p className="mb-6">{problem.statement}</p>

        <h2 className="text-xl font-semibold mb-2">
          Difficulty
        </h2>

        <p className="mb-6">{problem.difficulty}</p>

        <h2 className="text-xl font-semibold mb-2">
          Constraints
        </h2>

        <p>{problem.constraints}</p>
      </div>

      {/* Language */}
      <div className="mt-8">
        <label className="block font-semibold mb-2">
          Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Code */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">
          Code
        </label>

        <textarea
          rows="15"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="w-full border rounded-lg p-3 font-mono"
        />
      </div>

      {/* Custom Input */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">
          Custom Input
        </label>

        <textarea
          rows="3"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Run Code
        </button>

        <button
          onClick={submitCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Submit Code
        </button>
      </div>

      {/* Output */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Output
        </h2>

        <pre className="bg-black text-green-400 p-4 rounded-lg min-h-[120px] whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-600 mb-8">
          {user?.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Problems</h2>
            <p className="text-3xl font-bold mt-3">
              {problems.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Submissions</h2>
            <p className="text-3xl font-bold mt-3">
              {submissions.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Accepted</h2>
            <p className="text-3xl font-bold mt-3">
              {accepted}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Accuracy</h2>
            <p className="text-3xl font-bold mt-3">
              {accuracy}%
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-4">
          <Link
            to="/problems"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Solve Problems
          </Link>

          <Link
            to="/submissions"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Submission History
          </Link>
        </div>
      </div>
    </>
  );
  
}

export default ProblemDetails;