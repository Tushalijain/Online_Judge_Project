import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const problemRes = await api.get("/problems");
      const submissionRes = await api.get("/submissions");

      setProblems(problemRes.data);
      setSubmissions(submissionRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const accepted = submissions.filter(
    (sub) => sub.verdict === "Accepted"
  ).length;

  const accuracy =
    submissions.length > 0
      ? ((accepted / submissions.length) * 100).toFixed(2)
      : 0;

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

export default Dashboard;