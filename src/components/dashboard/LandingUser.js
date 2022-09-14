import React, { useState, useContext, useEffect } from "react"
import CreateTweet from "../layout/CreateTweet"
import axios from "axios"
import defaultUser from "../../assets/img/defaultUser.jpeg"
import StateContext from "../../StateContext"
import Tweet from "../layout/Tweet"
import DispatchContext from "../../DispatchContext"

function LandingUser() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    async function fetchAllTweets() {
      try {
        const response = await axios.get("/all")
        setTweets(response.data)
        globalDispatch({ type: "sameTweetList" })
      } catch (e) {
        console.log(e.response.data)
      }
    }
    fetchAllTweets()
  }, [globalState.isTweetListUpdate])

  return (
    <>
      <div className="container gy-5">
        <div className="row">
          <div className="col-3">
            <h1>
              Welcome <strong>{globalState.user.username}</strong>!
            </h1>
            <hr />
            <img className="mx-auto user-profile" src={defaultUser} alt="User" />
          </div>
          <div className="col-9">
            <h2>Create a new Tweet!</h2>
            <CreateTweet />
            <div className="">
              <h2>Explore new tweets!</h2>
              {tweets
                ? tweets.slice(0, 5).map(tweet => {
                    return <Tweet key={tweet.id} tweet={tweet} />
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingUser
