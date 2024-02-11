import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
 

export default function Login({url}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    try {
      const addData = {email, password}
  
      const {data} = await axios.post(`${url}/apis/login`, addData)

      localStorage.setItem('access_token', data.data.access_token)
      navigate('/')
    } catch (error) {
     console.log(error); 
     Swal.fire({
      title: error.response.data.error,
      icon: "error"
      });     
    }
  }


  function newEmail(event){
    setEmail(event.target.value)
  }
  
  function newPassword(event){
    setPassword(event.target.value)
  }

    return (
    <>
      <form className="form-control w-full max-w-xs" onSubmit={handleLogin}>
        <div className="label">
          <span className="label-text">Please input your email here</span>  
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={newEmail}/>
        <br />
        <br />
        <div className="label">
          <span className="label-text">Please input your password here</span>  
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={newPassword} />
        <div>
          <button type="submit" className="btn btn-accent">Login</button>
        </div>
      </form>
    </>)
  }