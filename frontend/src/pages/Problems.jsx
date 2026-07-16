import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await api.get("/problems");
      setProblems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Problems
      </h1>

      <div className="space-y-4">

        {problems.map((problem) => (

          <div
            key={problem._id}
            className="bg-white shadow rounded-lg p-6 flex justify-between items-center"
          >

            <div>
              <h2 className="text-xl font-semibold">
                {problem.title}
              </h2>

              <p className="text-gray-500">
                {problem.difficulty}
              </p>
            </div>

            <Link
              to={`/problems/${problem._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Solve
            </Link>

          </div>

        ))}

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

export default Problems;