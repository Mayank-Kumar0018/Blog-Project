import React , {useState} from 'react'
import Input from '../Input'
import Button from "../Button"
import authService from "../../appwrite/auth"
import {login as authlogin} from "../../features/authSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'



function Login() {

  const [error , setError] = useState("")
  const [errorShown , setErrorShown] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register , handleSubmit} = useForm()
  
  async function userLogin (data) {
    console.log(data)
    setError("")
    setErrorShown(false)
    try {
      const session = await authService.login(data)
      console.log(session)
      if (session) {

        //  localStorage.setItem("authToken", session.token);
        const userData = await authService.getAccount()
        console.log("userData to dispatch" , userData)
        if (userData) {
          dispatch(authlogin({userData}))
          
        }
      }
      navigate("/")
    } catch (error) {
      setError(error.message)
      setErrorShown(true)
      console.log(error.message)
    }
    
  }

  const handleSignup = () => {
    navigate('/signup')
  }
  return (
    <>
  
    <div className='h-screen flex justify-center items-center text-white'>
        <div className='bg-neutral-700 shadow-lg bg-opacity-20 rounded-lg rounded-r-none w-96 h-3/4 flex flex-col justify-center items-center gap-5'>
        <p className='text-3xl font-bold mb-12'>Login</p>
        {errorShown && <div className='w-80 h-14 text-center  px-4 text-red-400 border-2 border-red-900 rounded-md bg-opacity-20 bg-red-700'>{error}</div>}
        <form onSubmit={handleSubmit(userLogin)} className='flex flex-col gap-5'>


        <Input 
        className = "px-3" 
        placeholder = "Enter Your Email" 
        type = 'email'
        {...register("email" , {
          required : true,
          validate : {
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
          }
        })}>Email</Input>


        <Input 
        className = "px-3" 
        placeholder = "Enter Your Password" 
        type = 'password'
        {...register("password" , {
          required : true,
        })}>Password</Input>


        <div className='flex gap-7'>
        <Button type = "submit">Login</Button>
        <Button onClick = {handleSignup} className='bg-neutral-600 bg-opacity-40 hover:bg-indigo-500'>Signup</Button>
        </div>
        </form>
        
        </div>
        <div className='bg-green-500 h-3/4 w-[26rem]'>
        <img className='h-full w-full' src="https://images.unsplash.com/photo-1597332419554-26570da5fe75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWF0ZWQlMjB3YWxscGFwZXJzfGVufDB8fDB8fHww" alt=""/></div>
    </div>
    </>
  )
}

export default Login