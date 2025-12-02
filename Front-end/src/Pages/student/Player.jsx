import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

function Player() {

  const{enrolledCourse,calculateChapterTime}=useContext(AppContext)
  const {courseId} = useParams()
  const[courseData,setCourseData]=useState(null)
  const[openSection,setOpenSection]=useState({})
  const[playerData,setPlayerData]=useState(null)
  // So using this we will play the video in the right side

  console.log(enrolledCourse)
  console.log(courseId)

  const getCourseData = ()=>{
    enrolledCourse.map((course)=>{
      if(course._id===courseId){
        setCourseData(course)
      }
    })
  }

  console.log(courseData)

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(()=>{
    getCourseData()
  },[enrolledCourse])


      
  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-14 py-8">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
  
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Structure</h2>
  
          <div className="space-y-4">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border rounded-xl shadow-sm hover:shadow-md bg-white transition"
                >
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(index)}
                    className="cursor-pointer flex justify-between items-center px-4 py-3 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={assets.down_arrow_icon}
                        className={`w-4 transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
  
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures •{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
  
                  {/* Section Body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-[1000px]" : "max-h-0"
                    }`}
                  >
                    <ul className="px-6 py-3 space-y-3">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 border-b pb-3 last:border-none"
                        >
                          <img
                            src={assets.play_icon}
                            className="w-5 h-5 mt-1"
                          />
  
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {lecture.lectureTitle}
                            </p>
  
                            <div className="flex gap-4 text-xs sm:text-sm text-gray-600 mt-1">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-green-600 font-semibold cursor-pointer hover:text-green-700 hover:underline"
                                >
                                  Watch
                                </p>
                              )}
  
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 100,
                                  { units: ["h", "m"], round: true }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
  
        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md border p-4 sticky top-6 h-fit">
  
          {playerData ? (
            <div className="space-y-4">
              {/* YouTube Player */}
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video rounded-lg shadow-md"
                className="cursor-pointer"
              />
  
              {/* Video Info */}
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
  
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                  {false ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData ? courseData.courseThumbnail : ""}
              alt="Thumbnail"
              className="w-full rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;
