import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";

const templates = {
  python: `def solve():
    pass

    if __name__ == "__main__":
        solve()
    `,

      cpp: `#include <bits/stdc++.h>
    using namespace std;

    int main() {

        return 0;
    }
    `,

      c: `#include <stdio.h>

    int main() {

        return 0;
    }
    `,

      java: `public class Main {
        public static void main(String[] args) {

        }
    }
    `
};

function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [savedCodes, setSavedCodes] = useState({
  python: templates.python,
  cpp: templates.cpp,
  c: templates.c,
  java: templates.java,
});

  

  useEffect(() => {
    fetchProblem();
  }, []);

  useEffect(() => {
  setCode(templates.python);
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

const getVerdictColor = () => {
  if (output.includes("Accepted"))
    return "border-green-500 text-green-500";

  if (output.includes("Wrong Answer"))
    return "border-red-500 text-red-500";

  if (output.includes("Compilation Error"))
    return "border-yellow-500 text-yellow-500";

  if (output.includes("Runtime Error"))
    return "border-orange-500 text-orange-500";

  if (output.includes("Time Limit Exceeded"))
    return "border-purple-500 text-purple-500";

  return "border-gray-400 text-green-400";
};

  if (!problem) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="grid grid-cols-2 gap-6">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-lg shadow p-6 h-[85vh] overflow-y-auto">

          <h1 className="text-4xl font-bold mb-6">
            {problem.title}
          </h1>

          <h2 className="text-xl font-semibold mb-2">
            Problem Statement
          </h2>

          <p className="mb-6">
            {problem.statement}
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Difficulty
          </h2>

          <p className="mb-6">
            {problem.difficulty}
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Constraints
          </h2>

          <p>
            {problem.constraints}
          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-white rounded-lg shadow p-6 flex flex-col h-[85vh]">

          <label className="font-semibold mb-2">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => {
              const selectedLanguage = e.target.value;
              setLanguage(selectedLanguage);
              setCode(savedCodes[selectedLanguage]);
            }}
            className="border rounded-lg p-2 mb-4"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
          </select>

          <Editor
            height="450px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              const newCode = value || "";
              setCode(newCode);

              setSavedCodes((prev) => ({
                ...prev,
                [language]: newCode,
              }));
            }}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              automaticLayout: true,
              wordWrap: "on",
              tabSize: 4,
            }}
          />

        </div>

      </div>

     

 <div className="grid grid-cols-2 gap-6 mt-6">

  {/* Custom Input */}

  <div className="bg-white rounded-lg shadow p-4">

    <h2 className="text-lg font-semibold mb-3">
      Custom Input
    </h2>

    <textarea
      rows="8"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      className="w-full border rounded-lg p-3"
      placeholder="Enter custom input..."
    />

  </div>

  {/* Output */}

  <div className="bg-white rounded-lg shadow p-4">

    <h2 className="text-lg font-semibold mb-3">
      Output
    </h2>

    <div
  className={`rounded-lg border-2 p-5 min-h-[180px] ${getVerdictColor()}`}
>
  {output ? (
    <>
      <h3 className="text-2xl font-bold mb-4">
        {output.split("\n")[0]}
      </h3>

      <pre className="whitespace-pre-wrap">
        {output.split("\n").slice(1).join("\n")}
      </pre>
    </>
  ) : (
    <p className="text-gray-500">
      Run your code to see the output...
    </p>
  )}
</div>

  </div>

</div>

<div className="flex justify-end gap-4 mt-6">

  <button
    onClick={runCode}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
  >
    Run Code
  </button>

  <button
    onClick={submitCode}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
  >
    Submit Code
  </button>

</div>

    </div>
  </>
);

  
  
}

export default ProblemDetails;