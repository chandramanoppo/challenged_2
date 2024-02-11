
import { createBrowserRouter } from "react-router-dom";

import Home from "../views/Home";
import Navbar from '../components/Navbar'

import Details from "../views/Details";


const router = createBrowserRouter([
 
  {
    path: '/',
    element: <Home />
  
  },
  {
    element: <Navbar />,
    children:[
      {
        path: '/details/:id',
        element: <Details />
      },
    ]
  }

]);

export default router