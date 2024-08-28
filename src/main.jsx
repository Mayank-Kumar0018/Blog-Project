import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'  
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import { Hero } from './Components/index.js'
import { RouterProvider } from 'react-router-dom'
import Signup from './Components/Signup/Signup.jsx'
import RTE from './Components/RTE.jsx'
import AddPost from './Components/AddPost/AddPost.jsx'
import AllPost from './Components/AllPost/AllPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Hero />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "rte",
        element: <RTE />
      },
      {
        path: "addPost",
        element: <AddPost />
      },
      {
        path: "AllPost",
        element: <AllPost />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
