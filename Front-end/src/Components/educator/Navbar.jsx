import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const user = null; // replace later

  return (
    <div className="w-full h-16 bg-purple-100 flex justify-between items-center px-6 shadow-md">

      {/* LEFT — LOGO */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">SkillSphere</h1>
      </Link>

      {/* RIGHT — USER */}
      <p className="text-gray-700 font-medium">
        {user ? user.fullName : "Developers"}
      </p>
    </div>
  );
}

export default Navbar;