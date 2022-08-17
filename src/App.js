import React, { useState, useReducer, useEffect } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
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

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("username")),
    user: {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar")
    }
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
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={state.loggedIn ? <LandingUser /> : <Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/tweets" element={<AllTweets />} />
            <Route exact path="/users/all" element={<AllUsers />} />
            <Route exact path="/:username" element={<ProfileTweets />} />
            <Route exact path="/:username/reply/:tweetId" element={<TweetThread />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
