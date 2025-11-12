// this is the context page where we will add common logic to the concepts 
import { createContext, useState } from "react";
export const AppContext = createContext()
import { useEffect } from "react";

export const AppContextProvider = (props)=>{

    const[user,setUser]=useState(null)
    const[token,setToken]=useState(localStorage.getItem("token") || null);

    //Login function 
    const login =(userData,jwtToken)=>{
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('user',JSON.stringify(userData))
    }
    //Logout function
    const logout=()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
        user,token,login,logout, isAuthenticated: !!token,
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
