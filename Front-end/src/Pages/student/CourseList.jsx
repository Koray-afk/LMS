import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../Components/student/SearchBar";
import { AppContext } from "../../context/AppContext";
import CourseCard from "../../Components/student/CourseCard";
import { assets } from "../../assets/assets";

function CourseList() {
  const navigate = useNavigate();
  const { allCourses } = useContext(AppContext);

  // route param is ONLY "input" (from /courseList/:input)
  const { input } = useParams();


  
  const keyword = typeof input === "string" ? input.toLowerCase() : "";

  const [filterCourse, setFilterCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const temp = [...allCourses];

      if (keyword.length > 0) {
        setFilterCourse(
          temp.filter((course) =>
            course.courseTitle.toLowerCase().includes(keyword)
          )
        );
      } else {
        setFilterCourse(temp);
      }
    }
  }, [keyword, allCourses]);


  return (
    <div className="px-6 md:px-20 py-12">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Course List
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            <span
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">Course List</span>
          </p>
        </div>

        <div className="w-full md:w-1/3">
          <SearchBar data={keyword} />
        </div>
      </div>

      {input && (
  <div className="flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg w-fit mt-4">
    <p className="text-sm font-medium">{input}</p>

    <img
      src={assets.cross_icon}
      alt="Clear search"
      className="w-4 h-4 cursor-pointer hover:scale-110 transition"
      onClick={() => navigate('/courseList')}
    />
  </div>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 p-2 md:p-2">
      {
        filterCourse.map((value,index)=> <CourseCard key={index} course={value}/>)
      }
      </div>

    </div>
  );
}

export default CourseList;