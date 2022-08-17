import React, { useContext, useEffect, useState } from "react"
import StateContext from "../../StateContext"
import axios from "axios"
import defaultUser from "../../defaultUser.jpeg"
import { Params, useParams } from "react-router-dom"

function ReplyTweet() {
  const { tweetId } = useParams()
  const [description, setDescription] = useState()
  const currentDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  const globalState = useContext(StateContext)

  const theTweet = {
    username: localStorage.getItem("username"),
    description: description,
    datetime: currentDate,
    replies: []
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8080/api/v1.0/tweets/${globalState.user.username}/reply/${tweetId}`, theTweet)
      console.log(theTweet)
    } catch (e) {
      console.log(e.response.data)
    }
    e.target.reset()
  }

  return (
    <>
      <div className="container d-flex justify-content-end gap-left">
        <div className="outer">
          <div className="inner">
            <div className="row">
              <div className="col-2">
                <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">@{globalState.user.username}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{currentDate}</h6>
                    <form onSubmit={handleSubmit}>
                      <textarea onChange={e => setDescription(e.target.value)} maxLength="144" className="card-text form-control" rows="3"></textarea>
                      <button type="submit">Reply</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReplyTweet
