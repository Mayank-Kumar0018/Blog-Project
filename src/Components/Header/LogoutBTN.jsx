import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../features/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from 'react-router-dom'

function LogoutBTN() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {

        authService.logout()
        .then(() => {dispatch(logout())
          console.log("logout")
          navigate("/")
          
        } )
        .catch (() => console.log("error while doing logout"))

    }



  return (
    <button onClick={logoutHandler} className={`inline-flex items-center bg-indigo-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0` }>
         Logout
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
    </button>
  )
}

export default LogoutBTN