import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import errorPoint from "../../assets/img/exclamation-triangle-fill.svg"

function Register() {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [contactNumber, setContactNumber] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [errors, setErrors] = useState()

  const navigate = useNavigate()

  const theUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    contactNumber: contactNumber,
    username: username,
    password: password,
    avatar: "default.jpeg"
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (password === confirmPassword) {
      try {
        await axios.post("/register", theUser)
        console.log("User has successfully been created")
        navigate("/login")
      } catch (e) {
        console.log(e.response.data)
        console.log(e.response.data.message)
        console.log("User could not be created")
        setErrors(e.response.data.message)
      }
    } else {
      alert("Please ensure password and confirmation password is the same.")
    }
  }

  return (
    <>
      <div className="container pt-5">
        <form className="theme-blue inner ps-4 pe-3 pt-5 pb-2 w-50 shadow-lg" onSubmit={handleSubmit}>
          <div className="container ps-3">
            <h1 className="title m-0 ps-2">Register</h1>
          </div>
          <label className="m-auto ps-4 pt-4 text-white">All fields are mandatory</label>
          <div className="container g-2">
            <div className="input-group p-3">
              <span className="input-group-text" id="firstName-sign">
                First Name
              </span>
              <input aria-label="First Name" aria-describedby="firstName-sign" className="form-control" type="text" onChange={e => setFirstName(e.target.value)} placeholder="Enter First name" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="lastName-sign">
                Last Name
              </span>
              <input aria-label="Last Name" aria-describedby="lastName-sign" className="form-control" type="text" onChange={e => setLastName(e.target.value)} placeholder="Enter Last name" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="email-sign">
                Email
              </span>
              <input aria-label="Email" aria-describedby="email-sign" className="form-control" onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="contactNum-sign">
                Contact Number
              </span>
              <input aria-label="ContactNumber" aria-describedby="contactNum-sign" className="form-control" onChange={e => setContactNumber(e.target.value)} type="tel" name="contact-number" placeholder="Enter Contact Number" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="username-sign">
                @
              </span>
              <input aria-label="Username" aria-describedby="username-sign" className="form-control" onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Enter Username" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="password-handle">
                Password
              </span>
              <input aria-label="Password" aria-describedby="password-handle" className="form-control" onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder=" Enter Password" required />
            </div>

            <div className="input-group p-3">
              <span className="input-group-text" id="confirm-password-handle">
                Confirm Password
              </span>
              <input aria-label="Confirm Password" aria-describedby="confirm-password-handle" className="form-control" onChange={e => setConfirmPassword(e.target.value)} type="password" name="password-confirmation" placeholder="Confirm Password" required />
            </div>
          </div>

          {errors ? (
            <div className="container px-3 mt-3">
              <span className="px-1 ">
                <img className="text-danger" alt="" fill="#FF0000" src={errorPoint} />
              </span>
              <label className="m-auto p-1 border border-danger text-danger bg-white rounded ">{errors}</label>
            </div>
          ) : (
            ""
          )}

          <div className="container p-5">
            <div className="row gx-3">
              <div className="col-6 w-50">
                <Link to="/login" className="link-light text-decoration-none">
                  Already have an account? Click here to login
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

export default Register
