import React, { useContext } from "react"
import { Link } from "react-router-dom"
import NavBarLoggedOut from "./NavBarLoggedOut"
import NavBarLoggedIn from "./NavBarLoggedIn"
import StateContext from "../../StateContext"

function NavBar(props) {
  const globalState = useContext(StateContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark skyblue justify-content-between gap-bottom">
      <div className="narbar-logo gap-left">
        <Link className="navbar-brand" to="/">
          Tweet Application
        </Link>
      </div>
      {globalState.loggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
    </nav>
  )
}

export default NavBar
