import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import DispatchContext from "../../DispatchContext"

function Login() {
  const globalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const theUser = {
    username: username,
    password: password
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/api/v1.0/tweets/login", theUser)
      if (response.data) {
        globalDispatch({ type: "login", data: response.data })
        navigate("/")
      } else {
        console.log("Incorrect Username/ Password")
        alert("Incorrect Username / Password! Please try again.")
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }

  return (
    <>
      <div className="container pt-5">
        <form className="theme-blue inner p-5 w-50 shadow-lg" onSubmit={handleSubmit}>
          <div className="title">Login</div>
          <div className="input-container">
            <label className="text-white">Username </label>
            <input className="form-control text-left" onChange={e => setUsername(e.target.value)} type="text" name="username" required />
          </div>
          <div className="input-container pt-3">
            <label className="text-white">Password </label>
            <input className="form-control text-left" onChange={e => setPassword(e.target.value)} type="password" name="password" required />
          </div>

          <div className="container py-3 mt-4">
            <div className="row gx-3">
              <div className="col-6">
                <Link to="/forgot_password" className="link-light text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
              <div className="col-6">
                <button className="btn btn-primary shadow-sm border-light float-right w-50 p-2 mb-2" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
