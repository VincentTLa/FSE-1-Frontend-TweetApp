import React, { useState, useContext, useEffect } from "react"
import CreateTweet from "../layout/CreateTweet"
import axios from "axios"
import { Link } from "react-router-dom"
import defaultUser from "../../defaultUser.jpeg"
import StateContext from "../../StateContext"
import Tweet from "../layout/Tweet"

function LandingUser() {
  const globalState = useContext(StateContext)
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    async function fetchAllTweets() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1.0/tweets/all")
        setTweets(response.data)
      } catch (e) {
        console.log(e.resposne.data)
      }
    }
    fetchAllTweets()
  })

  return (
    <>
      <div className="container-xl gy-5">
        <div className="row">
          <div className="col-3">
            <h1>
              Welcome <strong>{globalState.user.username}</strong>!
            </h1>
            <hr />
            <img className="img-thumbnail mx-auto d-block user-profile" src={defaultUser} alt="User Image" />
          </div>
          <div className="col-9">
            <h2>Create a new Tweet!</h2>
            <CreateTweet />
            <div>
              <h2>Explore new tweets!</h2>
              {tweets.slice(0, 3).map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingUser
