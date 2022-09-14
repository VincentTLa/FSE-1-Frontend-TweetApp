import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ReplyTweet from "./ReplyTweet"
import Tweet from "../layout/Tweet"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

function TweetThread() {
  const { tweetId } = useParams()
  const [mainTweet, setMainTweet] = useState()
  const [replies, setReplies] = useState([])
  const [mainReplies, setMainReplies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const globalDispatch = useContext(DispatchContext)
  const globalState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = axios.CancelToken.source()
    async function fetchMainTweet() {
      try {
        const response = await axios.get(`/main/${tweetId}`)
        setMainTweet(response.data)
        setReplies(response.data.replies)
        setIsLoading(false)
        globalDispatch({ type: "sameTweetList" })
      } catch (e) {
        console.log(e.response)
      }
    }
    fetchMainTweet()
    return () => ourRequest.cancel()
  }, [globalState.isTweetListUpdate, globalDispatch, tweetId])

  useEffect(() => {
    const replyList = []
    if (replies) {
      replies.forEach(reply => {
        async function fetchReplies() {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1.0/tweets/main/${reply.id}`)
            if (response.data !== "") replyList.push(response.data)
            console.log(response.data)
            globalDispatch({ type: "updateTweetList" })
            globalDispatch({ type: "sameTweetList" })
          } catch (e) {
            console.log("Something went wrong")
          }
        }
        fetchReplies()
        setMainReplies(replyList)
      })
    }
  }, [replies, globalDispatch, globalState.isTweetListUpdate])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container p-3">
      {mainTweet ? (
        <div className="row">
          <div className="outer">
            <Tweet tweet={mainTweet} />

            <ReplyTweet />
            <div className="container text-center">
              <strong>Replies on this tweet</strong>
              <hr></hr>
              {replies ? replies.length === 0 ? <p className="text-center"> There are no replies on this tweet</p> : "" : ""}
            </div>
            <div className="gap-left container w-75 float-right">
              {replies
                ? replies.length !== 0
                  ? mainReplies.map(reply => {
                      return <Tweet key={reply.id} tweet={reply} />
                    })
                  : ""
                : ""}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Sorry! Looks like the tweet you're looking for has been deleted</div>
      )}
    </div>
  )
}

export default TweetThread
