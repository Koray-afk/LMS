import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/addCourses", icon: assets.add_icon },
    { name: "My Courses", path: "/educator/myCourses", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/educator/studentEnrolled", icon: assets.person_tick_icon },
  ];

  if (!isEducator) return null;

  return (
    <div className="w-64 h-[calc(100vh-64px)] fixed left-0 top-16 bg-white shadow-lg border-r p-5 overflow-y-auto">

      <div className="mt-3 flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
            ${isActive ? "bg-blue-300 text-white" : "text-gray-700 hover:bg-blue-50"}`
            }
          >
            <img src={item.icon} className="w-6 h-6" />
            <p className="font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;