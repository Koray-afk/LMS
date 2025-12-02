import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../Components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

function CourseDetails() {
  const { id } = useParams();

  // Correct context usage
  const {
    allCourses,
    averageRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateTotalLectures,
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({}); 
  const [isAlreadyEnrolled,setisAlreadyEnrolled]=useState(false)
  const [playerData,setPlayerData]=useState(null)

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((value) => value._id === id);
    setCourseData(findCourse);
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseData]);

  if (!courseData) return <Loading />;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-25 px-40 py-20 mb-50">
      {/* ---------------- Left Column ---------------- */}
      <div className="lg:w-150">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          {courseData.courseTitle}
        </h1>

        {/* Description */}
        <p
          className="mt-3 text-gray-600"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.substring(0, 250),
          }}
        ></p>

        {/* Ratings */}
        <div className="flex items-center gap-3 mt-4 text-sm">
          <p className="font-semibold text-yellow-500 text-lg">
            {averageRating(courseData)}
          </p>
          <span className="text-yellow-500 text-lg">⭐</span>
          <p className="text-gray-500">(22 ratings)</p>
          <p className="text-gray-700">
            {courseData.enrolledStudents.length}{" "}
            {courseData.enrolledStudents.length > 1
              ? "students"
              : "student"}
          </p>
        </div>

        {/* Instructor */}
        <p className="text-gray-700 mt-2 text-base">
          Course by <span className="font-semibold">Koray Cerragil</span>
        </p>
            
          {/* Course Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Course Content</h2>

           <div className="space-y-4">
            {courseData.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm bg-white"
              >
                {/* Section Header */}
                <div
                  onClick={() => toggleSection(index)}
                  className="cursor-pointer flex justify-between items-center px-4 py-3 "
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.down_arrow_icon}
                      alt=""
                      className={`w-4 transition-transform ${
                        openSection[index] ? "rotate-180" : ""
                      }`}
                    />
                    <p className="font-medium text-gray-800">
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
                        className="flex items-start gap-4 border-b pb-2"
                      >
                        <img
                          src={assets.play_icon}
                          className="w-5 h-5 mt-1"
                          alt=""
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {lecture.lectureTitle}
                          </p>

                          <div  className="flex gap-4 text-sm text-gray-500 mt-1 cursor-pointer">
                            {lecture.isPreviewFree && (
                              <p onClick={()=>setPlayerData({videoId:lecture.lectureUrl.split('/').pop()})} className="text-green-600 font-semibold">
                                Preview
                              </p>
                            )}

                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration *60 * 100, // FIXED
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

      
      </div>

      {/* ---------------- Right Column (Sidebar) ---------------- */}
      {/* RIGHT SIDEBAR CARD */}
<div className="lg:w-1/3 w-full">
  <div className="rounded-xl shadow-lg border overflow-hidden bg-white sticky top-10">

    {/* Course Thumbnail */}
    {
      playerData ?
       <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName="w-full aspect-video" className="cursor-pointer"  />
      
      :
    <img
      src={courseData.courseThumbnail}
      alt="Course Thumbnail"
      className="w-full object-cover h-56"
    />
    } 

    <div className="p-6">

 
      <div className="flex items-center text-red-500 font-medium text-sm gap-2 mb-3">
        <span className="text-lg">⏱</span>
        <p>5 days left at this price!</p>
      </div>

      {/* 💲 Pricing Section */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-gray-900">
          ${courseData.discount}
        </p>
      </div>


      <div className="flex items-center justify-between text-gray-700 text-sm mb-6">

        <div className="flex items-center gap-1">
          <span className="text-red-500 text-lg">★</span>
          <span>{averageRating(courseData)}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-lg">⏱</span>
          <span>{calculateCourseDuration(courseData)}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-lg">📘</span>
          <span>{calculateTotalLectures(courseData)} lessons</span>
        </div>

      </div>
    

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
        {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll now'}
      </button>

      {/* What's Inside Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          What’s in the course?
        </h3>

        <ul className="space-y-2 text-gray-600 text-sm leading-relaxed">
          <li>• Lifetime access with free updates.</li>
          <li>• Step-by-step, hands-on project guidance.</li>
          <li>• Downloadable resources and source code.</li>
          <li>• Quizzes to test your knowledge.</li>
          <li>• Certificate of completion.</li>
        </ul>
      </div>

    </div>
  </div>
</div>
    </div>
  );
}

export default CourseDetails;