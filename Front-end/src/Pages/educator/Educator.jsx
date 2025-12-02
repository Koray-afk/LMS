import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/educator/Navbar";
import Sidebar from "../../Components/educator/Sidebar";
import Dashboard from "./Dashboard";

function Educator() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

    
      <div className="flex">
        <Sidebar />

        {/* PAGE CONTENT (RIGHT SIDE) */}
        <div className="flex-1 ml-64 p-6">
  
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Educator;