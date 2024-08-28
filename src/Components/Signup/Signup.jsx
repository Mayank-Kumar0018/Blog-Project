import React from 'react'
import Input from '../Input'
import Button from "../Button"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { login as authlogin } from '../../features/authSlice'
import authService from '../../appwrite/auth'





function Signup() {

  const navigate = useNavigate()
  const {register , handleSubmit} = useForm()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [errorShown, setErrorShown] = useState(false)
  

   async function newUser (data) {
    console.log(data)
    setError("")
    setErrorShown(false)
    try {
      console.log('hello world 0')
      const session = await authService.createAccount(data);
      console.log("hello world 1")
      if(session) {

        const userData = await authService.getAccount()
        console.log(userData)
        console.log("hello world2")
        if(userData) dispatch(authlogin(userData))
        navigate("/")

      }
    console.log("hello world 2")
    } catch (error) {
      console.log(error.message)
      if (error.message === "A user with the same id, email, or phone already exists in this project.")  {
        setError("A user with same email id already exist")
        console.log("helly")

      }else{
        setError(error.message)
      }
      
      setErrorShown(true)
    }

   } 
  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }
  return (
    <>
    <div className='h-screen flex justify-center items-center text-white'>
        <div className='bg-neutral-700 shadow-lg bg-opacity-20 rounded-lg rounded-r-none w-96 h-3/4 flex flex-col justify-center items-center gap-7'>
        <p className='text-3xl font-bold mb-12'>Signup</p>
        {errorShown && <div className='flex items-center w-80 h-14 text-center  px-4 text-red-400 border-2 border-red-900 rounded-md bg-opacity-20 bg-red-700'>{error}</div>}
        <form onSubmit={handleSubmit(newUser)} className='flex flex-col gap-7'>
        <Input className = "px-3" placeholder = "Enter Your Name" {...register("name" , {
          required : true,
        })}>Name</Input>
        <Input className = "px-3" placeholder = "Enter Your Email" {...register("email" , {
          required : true,
          validate : {
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
          }
        })}>Email</Input>
        <Input className = "px-3" placeholder = "Enter Your Password" type = 'password' {...register("password" , {
          required : true,
        })}>Password</Input>
        <div className='flex gap-7'>
        <Button type = "submit">Signup</Button>
        <Button onClick = {handleLogin} className='bg-neutral-600 bg-opacity-40 hover:bg-indigo-500'>login</Button>
        </div>
        </form>
        </div>
        <div className='bg-green-500 h-3/4 w-[26rem]'>
        <img className='h-full w-full' src="https://images.unsplash.com/photo-1597332419554-26570da5fe75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWF0ZWQlMjB3YWxscGFwZXJzfGVufDB8fDB8fHww" alt=""/></div>
    </div>
    </>
  )
}

export default Signup