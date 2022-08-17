import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import defaultUser from "../../defaultUser.jpeg"
import StateContext from "../../StateContext"
function AllTweets() {
  const gloablState = useContext(StateContext)
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
  }, [])

  return (
    <div className="container-lg">
      <h1>All Tweets</h1>
      {tweets.map(tweet => {
        return (
          <div key={tweet.id} className="outer">
            <div className="inner">
              <div className="row">
                <div className="col-2">
                  <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
                </div>
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">@{tweet.username}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{tweet.datetime}</h6>
                      <p className="card-text">{tweet.description}</p>
                      <Link to={`/${gloablState.user.username}/reply/${tweet.id}`} className="card-link">
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllTweets
