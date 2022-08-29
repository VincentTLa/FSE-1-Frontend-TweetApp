import React, { useContext, useState } from "react"
import StateContext from "../../StateContext"
import axios from "axios"
import defaultUser from "../../assets/img/defaultUser.jpeg"
import DispatchContext from "../../DispatchContext"

function CreateTweet() {
  const [description, setDescription] = useState()
  const [tag, setTag] = useState("")
  const currentDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const theTweet = {
    username: localStorage.getItem("username"),
    description: description,
    datetime: currentDate,
    likes: [],
    replies: [],
    tag: tag
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8080/api/v1.0/tweets/${globalState.user.username}/add`, theTweet)
      globalDispatch({ type: "updateTweetList" })
      setDescription("")
      setTag("")
    } catch (e) {
      console.log(e.response.data)
    }
    e.target.reset()
  }

  return (
    <div className="container p-4">
      <div className="theme-blue m-auto p-3 pe-4 rounded-5 shadow">
        <div className="row">
          <div className="col-2 ps-3">
            <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
          </div>
          <div className="col-10">
            <div className="card my-3 p-2">
              <div className="card-body">
                <h3 className="card-title fw-light">@{globalState.user.username}</h3>
                <h6 className="card-subtitle mb-2 text-muted">{currentDate}</h6>

                <form onSubmit={handleSubmit}>
                  <div className="input-group p-2 d-inline-flex">
                    <span className="input-group-text" id="tag-sign">
                      Tags
                    </span>
                    <input aria-label="tag" aria-describedby="tag-sign" className="form-control" onChange={e => setTag(e.target.value)} type="text" name="tag" placeholder="Enter an optional tag (Max 50 char)" maxLength="50" />
                  </div>

                  <div className="input-group p-2">
                    <span className="input-group-text" id="description-sign">
                      Body
                    </span>
                    <textarea onChange={e => setDescription(e.target.value)} maxLength="144" aria-label="description" aria-describedby="description-sign" className="card-text form-control" rows="5" placeholder="Enter text here! (Max 144 char)"></textarea>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary shadow-sm border-light float-right p-2 px-3 mb-2 me-2" type="submit" disabled={!description}>
                      Create!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTweet
