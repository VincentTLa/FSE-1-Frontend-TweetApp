import React, { useContext, useState } from "react"
import StateContext from "../../StateContext"
import axios from "axios"
import defaultUser from "../../assets/img/defaultUser.jpeg"
import { useParams } from "react-router-dom"
import DispatchContext from "../../DispatchContext"

function ReplyTweet() {
  const { tweetId } = useParams()
  const [description, setDescription] = useState()
  const [tag, setTag] = useState("")
  const currentDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const theTweet = {
    username: globalState.user.username,
    description: description,
    datetime: currentDate,
    tag: tag,
    likes: [],
    replies: []
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(`/${globalState.user.username}/reply/${tweetId}`, theTweet)
      globalDispatch({ type: "updateTweetList" })
      setDescription("")
      setTag("")
      console.log(theTweet)
    } catch (e) {
      console.log(e.response.data)
    }
    e.target.reset()
  }

  return (
    <>
      <div className="container p-4 d-inline-block gap-left">
        <div className="float-right w-75">
          <div className="theme-blue m-auto p-3 pe-4 rounded-5">
            <div className="row">
              <div className="col-2 p-3">
                <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
              </div>
              <div className="col-10">
                <div className="card my-3 p-2">
                  <div className="card-body">
                    <h5 className="card-title">@{globalState.user.username}</h5>
                    <h6 className="card-subtitle text-muted">{currentDate}</h6>
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div className="input-group px-3 d-inline-flex">
                        <span className="input-group-text" id="tag-sign">
                          Tags
                        </span>
                        <input aria-label="tag" aria-describedby="tag-sign" className="form-control" onChange={e => setTag(e.target.value)} type="text" name="tag" placeholder="Enter an optional tag (Max 50 char)" maxLength="50" />
                      </div>

                      <div className="input-group p-3">
                        <span className="input-group-text" id="description-sign">
                          Body
                        </span>
                        <textarea onChange={e => setDescription(e.target.value)} maxLength="144" aria-label="description" aria-describedby="description-sign" className="card-text form-control" rows="5" placeholder="Enter text here! (Max 144 char)"></textarea>
                      </div>
                      <button className="btn btn-primary shadow-sm border-light float-right p-2 px-3 mb-2 me-3" type="submit" disabled={!description}>
                        Reply!
                      </button>
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
