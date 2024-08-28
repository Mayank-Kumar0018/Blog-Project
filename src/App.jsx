import { useState , useEffect } from "react"
import {Header , Footer ,Hero} from "./Components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./features/authSlice";
import authService from "./appwrite/auth";




function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("appwriteJWT");
    if (token) {
      authService.getAccount().then(userData => {
        dispatch(login(userData))
      }).catch(error => {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("appwriteJWT"); // Clean up if the token is invalid
      });
    }
  }, []);
  return(
    <>
    <Header />
    <Outlet />
    <Footer />

    </>
  );

 
  
}

export default App
