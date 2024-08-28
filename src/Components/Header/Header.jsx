import React from 'react'
import Button from "../Button"
import LogoutBTN from './LogoutBTN'
import { useSelector } from 'react-redux'
import { useNavigate , Link } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const status = useSelector(state => state.auth.status)

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const navItems = [
    {
      name: "Home",
      isActive: true,
      path: "/"
    },
    {
      name: "Blogs",
      isActive: true,
      path: "/AllPost"
    },
    {
      name: "Your Blogs",
      isActive: status,
      path: ""
    },
    
  ]







  return (
    <>
    

      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">Tailblocks</span>
          </a>
          <nav className=" text-white md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            {
              navItems.map((e) => (e.isActive ? <a key={e.name} onClick={() => navigate(`${e.path}`)} className="mr-5 hover:text-gray-500 hover:cursor-pointer">{e.name}</a> : null))
            }
          </nav>
          <div className='flex justify-center items-center gap-8'>



            {!status && <Button onClick = {handleLogin}>
              Login
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Button>}



            {!status && <Button onClick = {handleSignup} className="bg-neutral-600 bg-opacity-40 hover:bg-indigo-500">
              Sign Up
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Button>}

            {status && <Button onClick = {() => navigate("/addPost")} title = "New Blog"><svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  <line x1="12" y1="5" x2="12" y2="19"></line>
  <line x1="5" y1="12" x2="19" y2="12"></line>
</svg>
</Button>}
            {status && <LogoutBTN />}
            {/* <LogoutBTN /> */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header