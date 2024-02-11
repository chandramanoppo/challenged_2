import { Link, useNavigate } from "react-router-dom"

export default function Nav() {

  const navigate = useNavigate()

  function handleLogout(){
    localStorage.clear()
    navigate('/login')
  }

  return (
  <>
    <div className="navbar bg-[#708090]">
    <div className="flex-1">
      <Link to='/login' className="btn btn-ghost text-xl">
        Login
      </Link>
      </div>
      <div className="flex-1">
        <Link to='/'  className="btn btn-ghost text-xl">
        Home
        </Link>
      </div>
      <div className="flex-1">
        <Link to='/categories'  className="btn btn-ghost text-xl">
        Categories
        </Link>
      </div>
      <div className="flex-end">        
        <a className="btn btn-ghost text-xl" onClick={handleLogout}>Log-Out</a>
      </div>
    </div>
  </>)
}