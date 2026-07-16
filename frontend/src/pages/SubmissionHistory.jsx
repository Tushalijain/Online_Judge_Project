import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await api.get("/submissions");
      setSubmissions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Submission History
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">Problem</th>

              <th className="p-4 text-left">Language</th>

              <th className="p-4 text-left">Verdict</th>

              <th className="p-4 text-left">Execution Time</th>

              <th className="p-4 text-left">Submitted At</th>

            </tr>

          </thead>

          <tbody>

            {submissions.map((submission) => (

              <tr
                key={submission._id}
                className="border-t"
              >

                <td className="p-4">
                  {submission.problem?.title || "Unknown"}
                </td>

                <td className="p-4">
                  {submission.language}
                </td>

                <td
                  className={`p-4 font-semibold ${
                    submission.verdict === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submission.verdict}
                </td>

                <td className="p-4">
                  {submission.executionTime} ms
                </td>

                <td className="p-4">
                  {new Date(submission.createdAt).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

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

export default SubmissionHistory;