import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"

function NarBarLoggedIn(props) {
  const globalDispatch = useContext(DispatchContext)

  function handleLogout() {
    globalDispatch({ type: "logout" })
  }

  return (
    <div className="d-flex navbarNav gap-right">
      <ul className="navbar-nav nav-right">
        <li className="">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/tweets">
            Tweets
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/users/all">
            All Users
          </Link>
        </li>
        <li>
          <Link className="nav-link" onClick={handleLogout} to="/">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NarBarLoggedIn
