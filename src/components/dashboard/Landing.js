import React from "react"
import { Link } from "react-router-dom"

function Landing() {
  return (
    <>
      <div className="container text-center">
        <div className="p-5">
          <h1>Welcome to the Tweet.</h1>
          <hr></hr>
          <p>Lets get started.</p>
          <button className="btn btn-primary shadow-sm border-light rounded px-3 mt-2">
            <Link to="/register" className="link-light text-decoration-none">
              Join Now!
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Landing
