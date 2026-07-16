import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Online Judge
      </h1>

      <div className="flex items-center gap-6">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/problems">Problems</Link>

        <Link to="/submissions">Submissions</Link>

        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;