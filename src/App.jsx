
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import ViewServs from './components/ViewServs'
import VetServs from './components/VetServs'
import SignUp from './components/Signup'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import BookAppt from './components/BookAppt'
import 'react-toastify/dist/ReactToastify.css';
import AdminSignUp from './components/AdminSignUp'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import DashboardLayout from './layouts/DashboardLayout'
import AdminAppts from './components/AdminAppts'
import AdminClients from './components/AdminClients'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/admin/register",
      element:<AdminSignUp/>
    },
    {
      path:"/admin/login",
      element:<AdminLogin/>
    },
    {
      path:"/admin/dashboard",
      element:<DashboardLayout/>,
      children:[
        {
          index:true,
          element:<AdminDashboard/>
        },
        {
          path:"appointments",
          element:<AdminAppts/>
        },
        {
          path:"clients",
          element:<AdminClients/>
        }


      ]
    },
    {
      path:"/viewservices",
      element:<ViewServs/>
    },
    {
      path:"/vetservices",
      element:<VetServs/>
    },
    {
      path:"book-appt",
      element:<BookAppt/>
    }

 
  ])

  return <div>
    <RouterProvider router={router}/>
    <ToastContainer />
  </div>


}


export default App
