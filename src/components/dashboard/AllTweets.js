import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import StateContext from "../../StateContext"
import Tweet from "../layout/Tweet"
import DispatchContext from "../../DispatchContext"

function AllTweets() {
  const gloablState = useContext(StateContext)
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
  }, [gloablState.isTweetListUpdate, globalDispatch])

  return (
    <div className="container w-75">
      {tweets.length === 0 ? (
        <div className="text-center">
          <h1>Looks like there are no tweets...at least not yet 👀</h1>{" "}
        </div>
      ) : (
        <div>
          <h1>All Tweets</h1>
          {tweets.map(tweet => {
            return <Tweet key={tweet.id} tweet={tweet} />
          })}
        </div>
      )}
    </div>
  )
}

export default AllTweets
