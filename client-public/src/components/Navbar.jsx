// import axios from "axios"
// import { useEffect, useState } from "react"
// import Swal from "sweetalert2"
import { Link, Outlet } from "react-router-dom"

export default function Navbar() {
 

  return (<>
      <nav className="navbar bg-[#303c5c]" >
          <div className="flex-1">
            <Link className="btn btn-ghost text-xl text-white">             
                  Home
            </Link>
          </div>
          <Outlet />
      </nav>
  </>)
}