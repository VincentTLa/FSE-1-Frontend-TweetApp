import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password === confirmPassword) {
      try {
        const response = await axios.post(`/${username}/forgot`, password)
        if (response.data) {
          setError("")
          setConfirm(true)

          setTimeout(() => {
            navigate("/login")
          }, 1000)
        }
      } catch (e) {
        setError(e.response.data.message)
        console.log(e.response.data.message)
      }
    } else {
      setError("The password and confirm password fields need to be the same!")
    }
  }

  return (
    <div className="container pt-5">
      {confirm ? <p className="alert alert-success text-center shadow-sm">Password has been reset! Now redirecting to Login...</p> : ""}
      <form className="theme-blue inner p-5 w-50 shadow-lg" onSubmit={handleSubmit}>
        <div className="title">Forgot Password?</div>

        <div className="input-container">
          <label className="text-white">Username </label>
          <input className="form-control text-left" onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Enter your username" required />
        </div>

        <div className="input-container pt-3">
          <label className="text-white">New Password </label>
          <input className="form-control text-left" onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Enter new password" required />
        </div>

        <div className="input-container pt-3">
          <label className="text-white">Confirm New Password </label>
          <input className="form-control text-left" onChange={e => setConfirmPassword(e.target.value)} type="password" name="password" placeholder="Confirm new password" required />
        </div>
        {error ? <p className="m-auto mt-3 p-2  border border-danger text-danger bg-white rounded">{error}</p> : ""}

        <div className="container py-3 mt-4">
          <div className="row gx-3">
            <div className="col-6"></div>
            <div className="col-6">
              <button className="btn btn-primary shadow-sm border-light float-right px- mb-2" type="submit">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
