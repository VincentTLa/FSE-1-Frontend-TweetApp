import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../../StateContext"
import defaultUser from "../../assets/img/defaultUser.jpeg"
import heartUnfilled from "../../assets/img/heart.svg"
import heartFilled from "../../assets/img/heart-fill.svg"
import replyChat from "../../assets/img/chat-left-text.svg"
import xSquare from "../../assets/img/x-square.svg"
import editImg from "../../assets/img/pencil-square.svg"
import axios from "axios"
import DispatchContext from "../../DispatchContext"

function Tweet(props) {
  const tweet = props.tweet
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)
  const [edit, setEdit] = useState(false)
  const [tag, setTag] = useState("")
  const [description, setDescription] = useState()
  const [like, setLike] = useState(false)
  const [count, setCount] = useState()

  const theTweet = {
    username: tweet.username,
    description: description,
    datetime: tweet.datetime,
    tag: tag
  }

  // Handles the edit button, where a user can click it again to open/close
  function handleEdit(e) {
    e.preventDefault()
    setDescription(tweet.description)
    setTag(tweet.tag)
    setEdit(!edit)
  }

  // Handles the update of the tweet
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(`/${globalState.user.username}/update/${tweet.id}`, theTweet)
      globalDispatch({ type: "updateTweetList" })
      setEdit(false)
    } catch (e) {
      console.log(e.response.data)
    }
    e.target.reset()
  }

  // Handles the delete functionality of a tweet
  async function handleDelete(e) {
    e.preventDefault()
    try {
      // When clicked, sends api call to delete tweet
      await axios.delete(`/${globalState.user.username}/delete/${tweet.id}`)
      globalDispatch({ type: "updateTweetList" })
    } catch (e) {
      console.log(e.response.data)
    }
  }

  // Handles the Like functionality
  async function handleLike() {
    try {
      // When clicked, sends api call to set value {username, true} to likes field.
      await axios.put(`/${globalState.user.username}/like/${tweet.id}`)
      setLike(true)
      globalDispatch({ type: "updateTweetList" })
    } catch (e) {
      console.log(e.response.data)
    }
  }

  // Handles the Unlike functionality
  async function handleUnlike() {
    try {
      // When clicked, sends api call to set value {username, false} to likes field.
      await axios.put(`/${globalState.user.username}/unlike/${tweet.id}`)
      setLike(false)
      globalDispatch({ type: "updateTweetList" })
    } catch (e) {
      console.log(e.response.data)
    }
  }

  // Creates value to calculate the amount of likes and checks to see if the user has liked the post or not
  useEffect(() => {
    if (tweet.likes) {
      const existsLike = tweet.likes.some(v => v.username === globalState.user.username && v.value === true)
      const existsUnlike = tweet.likes.some(v => v.username === globalState.user.username && v.value === false)

      let counter = 0
      tweet.likes.forEach(like => {
        if (like.value === true) {
          counter = counter + 1
        }
        setCount(counter)
      })

      // Checks if user has liked the tweet, then like value is true to display Heart
      if (existsLike) {
        setLike(true)
      }
      // Checks if user has unliked the tweet, then like value is false to display empty heart
      else if (existsUnlike) {
        setLike(false)
      }
    } else {
      console.log("Likes field is null")
    }
  }, [like, globalState.user.username, tweet.id, tweet.likes])

  return (
    <>
      <div className="container p-4">
        <div className="theme-blue m-auto p-3 pe-4 rounded-5 shadow">
          <div className="row">
            <div className="col-2 d-inline-flex ps-4">
              <img className="tweet-profile mx-auto" src={defaultUser} alt="Profile Pic" />
            </div>
            <div className="col-10">
              <div className="container">
                <div className="card my-3 p-2">
                  <div className="card-body">
                    {globalState.user.username === tweet.username ? (
                      <>
                        <span onClick={handleDelete} className="float-right d-inline-flex text-danger fw-light cursor">
                          <img src={xSquare} alt="delete" />
                          Delete
                        </span>

                        <span onClick={handleEdit} className="float-right d-inline-flex text-primary fw-light cursor me-3">
                          <img src={editImg} alt="edit" />
                          Edit
                        </span>
                      </>
                    ) : (
                      ""
                    )}

                    <h3 className="card-title fw-light">@{tweet.username}</h3>
                    <p className="card-subtitle text-muted mb-3">{tweet.datetime}</p>

                    <div className="container pb-3 mb-4">
                      {edit ? (
                        <form onSubmit={handleSubmit}>
                          <div className="input-group p-2 d-inline-flex">
                            <span className="input-group-text" id="tag-sign">
                              Tags
                            </span>
                            <input aria-label="tag" aria-describedby="tag-sign" className="form-control" onChange={e => setTag(e.target.value)} value={tag} type="text" name="tag" placeholder="Edit your Tags (Max 50 char)" maxLength="50" />
                          </div>
                          <div className="input-group p-2">
                            <span className="input-group-text" id="description-sign">
                              Edit
                            </span>
                            <textarea onChange={e => setDescription(e.target.value)} value={description} maxLength="144" aria-label="description" aria-describedby="description-sign" className="card-text form-control" rows="5" placeholder="Edit your post (Max 144 char)"></textarea>
                          </div>

                          <div className="my-3 pb-3">
                            <button className="btn btn-primary shadow-sm border-light float-right p-2 px-3 mb-2 me-2" type="submit" disabled={!description}>
                              Edit Tweet
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          {tweet.tag === "" || tweet.tag === null ? (
                            <>
                              <div className="d-inline">
                                <label className="text text-dark me-2 fw-semibold">Tags:</label>
                                <span className="badge rounded-pill text-bg-dark mb-3 m-auto p-auto" aria-label="tags" aria-describedby="tag-sign">
                                  <strong>None</strong>
                                </span>
                              </div>
                              <div>
                                <label htmlFor="description" className="text-dark fw-semibold">
                                  Posted:
                                </label>
                                <p className="card-text border border-none m-auto p-4 rounded text text-left" id="description">
                                  {tweet.description}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="d-inline">
                                <label className="text text-dark me-2 fw-semibold">Tags:</label>
                                <span className="badge rounded-pill text-bg-primary mb-3 m-auto p-auto" aria-label="tags" aria-describedby="tag-sign">
                                  <strong>{tweet.tag}</strong>
                                </span>
                              </div>
                              <div>
                                <label htmlFor="description" className="text-dark fw-semibold">
                                  Posted:
                                </label>
                                <p className="card-text border border-none m-auto p-4 rounded text text-left" id="description">
                                  {tweet.description}
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <hr></hr>

                    <div className="row">
                      {like ? (
                        <div onClick={handleUnlike} className="col-1 pe-5">
                          <div className="d-inline-flex">
                            <img className="mx-2" src={heartFilled} alt="Liked Heart" />
                            <p className="ps-1 pt-4">{count ? count : 0}</p>
                          </div>
                        </div>
                      ) : (
                        <div onClick={handleLike} className="col-1 pe-5">
                          <div className="d-inline-flex">
                            <img className="mx-2" src={heartUnfilled} alt="Unliked Heart" />
                            <p className="ps-1 pt-4">{count ? count : 0}</p>
                          </div>
                        </div>
                      )}

                      <div className="col-1 px-4">
                        <div className="d-inline-flex">
                          <Link className=" card-link p-1 mb-3 mx-auto my-auto" to={`/${globalState.user.username}/reply/${tweet.id}`}>
                            <img src={replyChat} alt="reply" />
                          </Link>
                          <p className="pt-4 mx-2">{tweet.replies ? tweet.replies.length : 0}</p>
                        </div>
                      </div>
                    </div>
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

export default Tweet
