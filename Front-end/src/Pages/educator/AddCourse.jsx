import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate()

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const{token,backend_Url}=useContext(AppContext)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });


  const handleChapter = (action,chapterId)=>{
    if(action==='add'){
      const title = prompt("Enter Chapter name:")
      if(title){
        const newChapter = {
          chapterId: crypto.randomUUID(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder+1:1 ,
        };


        setChapters([...chapters,newChapter])
      }
    
    else if(action==='remove'){
      setChapters(chapters.filter((chapter)=>chapter.chapterId!==chapterId));
    }
    else if(action==='toggle'){
      setChapters(
        chapters.map((chapter)=> chapter.chapterId === chapterId ? {...chapter ,collapsed:!chapter.collapsed } : chapter)
      )
    }
  }}

  const handleLectures = (action , chapterId , lectureIndex)=>{
      if(action==='add'){
        setCurrentChapterId(chapterId)
        setShowPopup(true)
      }
      else if(action==='remove'){
        setChapters(
          chapters.map((chapter)=>{
            if(chapter.chapterId===chapterId){
              chapter.chapterContent.splice(lectureIndex,1)
            }

            return chapter
          })
        )
      }
  };
  
  const addLectures = ()=>{
    setChapters(
      chapters.map((chapter)=>{
        if(chapter.chapterId===currentChapterId){
          const newLecture = {
            ...lectureDetails,
            lectureOrder : chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder+1:1,
            lectureId: crypto.randomUUID()
          }

          chapter.chapterContent.push(newLecture)
        }
        return chapter
      })
    )
    setShowPopup(false)
    setLectureDetails(
      { lectureTitle: "",
        lectureDuration: "",
        lectureUrl: "",
        isPreviewFree: false,}
    )
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!image){
      alert('Please provide a Thumbnail')
      return 
    } 

    const courseDescription = quillRef.current.root.innerHTML

    // Now we have to build course STructure similar to backend 
    const courseData = {
      courseTitle,
      courseDescription,
      coursePrice,
      discount,
      isPublished:true,
      courseContent:chapters
    }

    try{
      const formData = new FormData()
      formData.append('courseData',JSON.stringify(courseData))
      formData.append('image',image)

      const response = axios.post(`${backend_Url}/api/educator/add-course`,formData,{headers:{Authorization:`Bearer ${token}`, "Content-Type": "multipart/form-data",}})

      console.log("courseData-->",response.data)
      alert('Course added Successfully')
      navigate("/educator/myCourses");
    }
    catch(error){
      console.log(error)
      console.log(error.response?.data || error);
    }

  }



  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl w-full bg-white shadow-md p-6 rounded-lg">
        
        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Course Title</p>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Course Description</p>
          <div
            ref={editorRef}
            className="border border-gray-300 rounded min-h-[120px]"
          ></div>
        </div>

        {/* Price + Thumbnail */}
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Price */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Course Price</p>
            <input
              type="number"
              placeholder="0"
              required
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 w-32 px-3 rounded border border-gray-500 focus:border-blue-500"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex md:flex-row flex-col items-center gap-3">
            <p className="font-semibold">Course Thumbnail</p>

            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.file_upload_icon}
                className="w-10 h-10 p-2 bg-blue-500 rounded"
                alt=""
              />

              <input
                type="file"
                id="thumbnailImage"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* Preview */}
              <img
                className="max-h-12 rounded"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Discount (%)</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            value={discount}
          />
        </div>

        {/* Chapters & Lectures */}
        <div className="flex flex-col gap-3">
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="border rounded p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img onClick={()=>handleChapter('toggle',chapter.chapterId)}
                    className={`w-4 cursor-pointer transition-transform ${
                      chapter.collapsed ? "-rotate-90" : ""
                    }`}
                    src={assets.dropdown_icon}
                    alt=""
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>

                <img onClick={()=>handleChapter('remove',chapter.chapterId)}
                  src={assets.cross_icon}
                  alt=""
                  className="w-4 cursor-pointer"
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-3  flex flex-col gap-2">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center bg-white border rounded px-3 py-2"
                    >
                      <span className="text-sm">
                        {lectureIndex + 1}. {lecture.lectureTitle} –{" "}
                        {lecture.lectureDuration} mins –{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Link
                        </a>{" "}
                        – {lecture.isPreviewFree ? "Free" : "Paid"}
                      </span>

                      <img 
                        src={assets.cross_icon}
                        alt=""
                        className="w-4 cursor-pointer"
                        onClick={() =>
                          handleLectures('remove',chapter.chapterId,lectureIndex )
                        }
                      />
                    </div>
                  ))}

                  <div onClick={()=>handleLectures('add',chapter.chapterId)} className="text-blue-600 cursor-pointer text-sm">
                    Add Lectures
                  </div>
                </div>
              )}
            </div>
          ))}

          <div onClick={()=>handleChapter('add',chapters.chapterId)} className="text-blue-400 font-medium cursor-pointer">
            + Add Chapters
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-gray-500 opacity-100 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                <h2 className="text-lg font-semibold mb-3"> + Add Lecture</h2>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Lecture Title</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                    type="text"
                    value={lectureDetails.lectureTitle}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <p className="font-medium">Duration (Minutes)</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                    type="text"
                    value={lectureDetails.lectureDuration}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <p className="font-medium">Lecture Url</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                    type="text"
                    value={lectureDetails.lectureUrl}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <p className="font-medium">Is Preview Free</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                    type="checkbox"
                    value={lectureDetails.isPreviewFree}
                  />
                </div>

                <button
                onClick={addLectures}
                  type="button"
                  className="bg-blue-600 text-white w-full py-2 rounded mt-3"
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopup(false)}
                  className="w-5 absolute top-3 right-3 cursor-pointer"
                  src={assets.cross_icon}
                  alt=""
                />

              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-lg mt-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
}


export default AddCourse;
