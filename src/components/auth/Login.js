import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import DispatchContext from "../../DispatchContext"
import "./Login.css"

function Login(props) {
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
        console.log(response.data)
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
      <div className="outer-form">
        <form className="inner form" onSubmit={handleSubmit}>
          <div className="title">Login</div>
          <div className="input-container">
            <label>Username </label>
            <input onChange={e => setUsername(e.target.value)} type="text" name="username" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" required />
          </div>
          <div className="submit-container">
            <Link to=" " className="link">
              Forgot password?
            </Link>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
