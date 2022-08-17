import React, { useState } from "react"
import NavBar from "../layout/NavBar"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Register.css"

function Register() {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [contactNumber, setContactNumber] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()

    const theUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      username: username,
      password: password,
      avatar: "default.jpeg"
    }

    if (password === confirmPassword) {
      try {
        await axios.post("http://localhost:8080/api/v1.0/tweets/register", theUser)
        console.log("User has successfully been created")
        alert("Account created!")
        navigate("/login")
      } catch (e) {
        console.log(e.response.data)
      }
    } else {
      alert("Please ensure password and confirmation password is the same.")
    }
  }

  return (
    <>
      <div className="outer-form">
        <form className="inner form-register" onSubmit={handleSubmit}>
          <div className="title-register">Register</div>
          <div className="input-container-register">
            <label>First Name </label>
            <input onChange={e => setFirstName(e.target.value)} type="text" name="firstName" required />

            <label>Last Name </label>
            <input onChange={e => setLastName(e.target.value)} type="text" name="lastName" required />

            <label>Email </label>
            <input onChange={e => setEmail(e.target.value)} type="email" name="username" required />

            <label>Contact Number </label>
            <input onChange={e => setContactNumber(e.target.value)} type="tel" name="username" required />

            <label>Username </label>
            <input onChange={e => setUsername(e.target.value)} type="text" name="username" required />

            <label>Password </label>
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" required />

            <label>Confirm Password </label>
            <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="password-confirmation" required />
          </div>

          <div className="submit-container-register">
            <Link to="/login" className="link-login">
              Already have an account? Click here to login
            </Link>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
