import React, { useEffect, useState } from "react"
import defaultUser from "../../assets/img/defaultUser.jpeg"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import IsLoading from "./IsLoading"
import Tweet from "../layout/Tweet"

function ProfileTweets() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [userTweets, setUserTweets] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchAllUserTweets() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1.0/tweets/${username}`)
        setUserTweets(response.data)
        setIsLoading(false)
        setError(false)
      } catch (e) {
        console.log(e.response.data.message)
        setError(e.response.data.message)
        setIsLoading(false)
      }
    }
    fetchAllUserTweets()
  }, [username])

  if (isLoading) return <IsLoading />
  return (
    <div className="container-xl gy-5">
      <div className="row p-3 text-left">
        <div className="col-3 gap-right">
          <Link to="/users/all">Return to Users</Link>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <div className="container d-block text-wrap">
            All Tweets from
            <h2 className="fw-light">{username}</h2>
            <hr />
            <img className="mx-auto d-block user-profile" src={defaultUser} alt="User" />
          </div>
        </div>
        <div className="col-9">
          <div className="container">
            {error ? (
              <div className="container text-center">{error}</div>
            ) : (
              userTweets.map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} />
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTweets
