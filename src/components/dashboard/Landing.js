import React from "react"
import { Link } from "react-router-dom"
import "./Landing.css"

function Landing() {
  return (
    <>
      <div className="top-section">
        <div>
          <h1>Welcome to the Tweet.</h1>
          <hr></hr>
          <p>Lets get started.</p>
        </div>
        <div className="button">
          <Link to="/register" className="link">
            Join Now!
          </Link>
        </div>
      </div>
    </>
  )
}

export default Landing
