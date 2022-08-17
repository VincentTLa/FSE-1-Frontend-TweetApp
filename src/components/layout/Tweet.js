import React, { useContext, useEffect, useState } from "react"
import { Link, Params, useParams } from "react-router-dom"
import StateContext from "../../StateContext"
import "./Tweet.css"
import axios from "axios"
import defaultUser from "../../defaultUser.jpeg"
function Tweet(props) {
  const tweet = props.tweet
  const globalState = useContext(StateContext)

  return (
    <>
      <div className="outer">
        <div className="inner">
          <div className="row">
            <div className="col-2">
              <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{tweet.username}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{tweet.datetime}</h6>
                  <p className="card-text">{tweet.description}</p>
                  <Link to={`/${globalState.username}/reply/${tweet.id}`} className="card-link">
                    Reply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tweet
