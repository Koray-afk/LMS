import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import { dummyCourses } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backend_Url = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isEducator, setIsEducator] = useState(false);

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // LOGIN

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsEducator(userData?.role === "educator");

    navigate("/");
  };


  // LOGOUT

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsEducator(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // BECOME EDUCATOR

  const becomeEducator = async () => {
    try {
      const response = await axios.post(
        `${backend_Url}/api/educator/become-educator`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      const newToken = response.data.token;

      // Decode or manually update user role
      const updatedUser = { ...user, role: "educator" };

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setToken(newToken);
      setUser(updatedUser);
      setIsEducator(true);

      navigate("/educator");

    } catch (error) {
      console.log(error.response?.data || error);
      alert("Failed to upgrade to educator.");
    }
  };

  // -----------------------------
  // LOAD USER FROM LOCALSTORAGE
  // -----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsEducator(parsed?.role === "educator");
    }
  }, []);


  const fetchAllCourses = async()=>{
    try{
      const {data} = await axios.get(`${backend_Url}/api/course/all`)
      if(data.success){
        setAllCourses(data.course)
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      console.log(error)
      toast.error(toast.message)
    }
  }

  useEffect(() => {
    setEnrolledCourses(dummyCourses);
    fetchAllCourses()
  }, []);


  const averageRating = (course) => {
    if (!course.courseRatings.length) return 0;
    let total = 0;
    course.courseRatings.forEach((r) => (total += r.rating));
    return total / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lec) => (time += lec.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((ch) =>
      ch.chapterContent.forEach((lec) => (time += lec.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateTotalLectures = (course) => {
    let total = 0;
    course.courseContent.forEach(
      (ch) => (total += ch.chapterContent.length)
    );
    return total;
  };

  // -----------------------------
  // FINAL PROVIDED VALUE
  // -----------------------------
  const value = {
    user,
    token,
    backend_Url,
    currency,
    login,
    logout,
    isAuthenticated: !!token,
    isEducator,
    becomeEducator,
    allCourses,
    enrolledCourses,
    averageRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateTotalLectures,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
