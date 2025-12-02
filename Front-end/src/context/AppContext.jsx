// this is the context page where we will add common logic to the concepts 
import { createContext, useState } from "react";
export const AppContext = createContext()
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";



export const AppContextProvider = (props)=>{

    const[user,setUser]=useState(null)
    const[isEducator,setIsSducator]=useState(true)
    const[token,setToken]=useState(localStorage.getItem("token") || null);
    const navigate = useNavigate()
    const backend_Url = import.meta.env.VITE_BACKEND_URL;
    const currency = import.meta.env.VITE_CURRENCY  
    const [enrolledCourse,setEnrolledCourses]=useState([])

    const[allCourses,setAllCourses]=useState([])

    console.log(allCourses)

    //Login function 
    const login =(userData,jwtToken)=>{
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('user',JSON.stringify(userData))
        navigate('/')
      
    }
    //Logout function
    const logout=()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    // Fetch all courses 
    const fetchAllCourses = ()=>{
      setAllCourses(dummyCourses)
    }

    const userEnrolledCourses = async()=>{
      setEnrolledCourses(dummyCourses)
    }


    // Fucntion to calculate average rating of course 
    const averageRating = (course)=>{
        if(course.courseRatings.length===0){
          return 0
        }

        let totalRatings = 0 
        course.courseRatings.forEach(rating => {
          totalRatings+=rating.rating
        })

        return totalRatings/course.courseRatings.length
      }

    useEffect(()=>{
      fetchAllCourses(),
      userEnrolledCourses()
    },[])


    // Function to calculate course chapter time 
    const calculateChapterTime = (chapter)=>{
      let time = 0
      chapter.chapterContent.map((value)=> time+=value.lectureDuration)
      return humanizeDuration(time*60*100,{units:['h','m']})
    }
    
    // function to calculate course duration 
    const calculateCourseDuration = (course)=>{
      let time = 0 

      course.courseContent.map((chapter)=>chapter.chapterContent.map((value)=> time+=value.lectureDuration))

      return humanizeDuration(time*60*100,{units:['h','m']})
    }

    // fucntion to calculate total number of lectures 
    const calculateTotalLectures = (course)=>{
      let totalLectures=0
      course.courseContent.map((value)=> totalLectures+=value.chapterContent.length)
    }




    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
      
        if (storedToken) {
          setToken(storedToken);
        }
      
        if (storedUser && storedUser !== "undefined") {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (err) {
            console.error("Invalid user JSON in localStorage:", err);
            localStorage.removeItem("user");
          }
        }
      }, []);
    const value={
        user,token,login,logout, isAuthenticated: !!token,backend_Url,currency,allCourses,averageRating,isEducator,calculateChapterTime,calculateCourseDuration,calculateTotalLectures,enrolledCourse
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
