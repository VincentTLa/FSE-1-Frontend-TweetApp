import React, { useEffect } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { useImmerReducer } from "use-immer"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

// Contexts
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// Components
import Landing from "./components/dashboard/Landing"
import LandingUser from "./components/dashboard/LandingUser"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import NavBar from "./components/layout/NavBar"
import AllTweets from "./components/dashboard/AllTweets"
import AllUsers from "./components/dashboard/AllUsers"
import ProfileTweets from "./components/dashboard/ProfileTweets"
import TweetThread from "./components/dashboard/TweetThread"
import Search from "./components/dashboard/Search"
import ForgotPassword from "./components/auth/ForgotPassword"

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("username")),
    user: {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar")
    },
    isSearchOpen: false,
    isTweetListUpdate: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
      case "updateTweetList":
        draft.isTweetListUpdate = true
        return
      case "sameTweetList":
        draft.isTweetListUpdate = false
        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("username", state.user.username)
      localStorage.setItem("email", state.user.email)
      localStorage.setItem("avatar", state.user.avatar)
    } else {
      localStorage.removeItem("username")
      localStorage.removeItem("email")
      localStorage.removeItem("avatar")
    }
  }, [state.loggedIn, state.user.avatar, state.user.email, state.user.username])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={state.loggedIn ? <LandingUser /> : <Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot_password" element={<ForgotPassword />} />
            <Route exact path="/tweets" element={state.loggedIn ? <AllTweets /> : <Login />} />
            <Route exact path="/users/all" element={state.loggedIn ? <AllUsers /> : <Login />} />
            <Route exact path="/:username" element={state.loggedIn ? <ProfileTweets /> : <Login />} />
            <Route exact path="/:username/reply/:tweetId" element={state.loggedIn ? <TweetThread /> : <Login />} />
          </Routes>
          <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit>
            <Search />
          </CSSTransition>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
