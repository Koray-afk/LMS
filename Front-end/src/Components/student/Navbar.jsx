import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";

function Navbar() {
  const location = useLocation();

  const isCourseListPage = location.pathname.includes("/courseList");
  const { isAuthenticated, logout, isEducator, becomeEducator } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b transition-all duration-300 ${
        isCourseListPage
          ? "bg-white border-gray-300"
          : "bg-blue-200 border-violet-300 shadow-sm"
      }`}
    >
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl font-bold text-violet-700 cursor-pointer hover:text-violet-900 transition-all duration-300"
      >
        SkillSphere
      </h1>

      <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                if (isEducator) {
                  navigate("/educator");
                } else {
                  becomeEducator();
                }
              }}
              className="hover:text-violet-700 transition-colors duration-200 cursor-pointer "
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>

            <span className="text-gray-400">|</span>
            <Link
              to="/myEnrollments"
              className="hover:text-violet-700 transition-colors duration-200"
            >
              My Enrollments
            </Link>
            <button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-sm transition-all duration-200"
          >
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
