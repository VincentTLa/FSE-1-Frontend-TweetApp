import React, { useEffect, useState } from "react"
import { Params, Link, useParams } from "react-router-dom"
import axios from "axios"
import defaultUser from "../../defaultUser.jpeg"
import ReplyTweet from "./ReplyTweet"
import Tweet from "../layout/Tweet"

function TweetThread() {
  const { tweetId } = useParams()
  const [mainTweet, setMainTweet] = useState()
  const [replies, setReplies] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1.0/tweets/main/${tweetId}`)
        setMainTweet(response.data)
        setReplies(response.data.replies)
        setIsLoading(false)
      } catch (e) {
        console.log(e.response.data)
      }
    }
    fetchAllUsers()
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container p-3">
      <div className="row">
        <div className="outer">
          <div className="inner">
            <div className="row">
              <div className="col-2">
                <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">@{mainTweet.username}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{mainTweet.datetime}</h6>
                    <p className="card-text">{mainTweet.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReplyTweet />
          <div className="container text-center">
            <strong>Replies from most recent</strong>
            <hr></hr>
          </div>
          <div className="gap-left container">
            {replies ? (
              replies.map(reply => {
                return <Tweet key={reply.id} tweet={reply} />
              })
            ) : (
              <div className="container text-center">
                <p> There are no replies on this tweet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetThread
