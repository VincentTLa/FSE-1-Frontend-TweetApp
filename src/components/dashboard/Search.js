import React, { useContext, useEffect } from "react"
import xSquare from "../../assets/img/x-square.svg"
import DispatchContext from "../../DispatchContext"
import { useImmer } from "use-immer"
import axios from "axios"
import { Link } from "react-router-dom"
import defaultUser from "../../assets/img/defaultUser.jpeg"

function Search() {
  const globalDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0
  })

  // Allows user to click the 'ESC' key to exit search
  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler)
    return () => document.removeEventListener("keyup", searchKeyPressHandler)
  }, [])

  // Watches search term for changes
  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++
        })
      }, 500)
      return () => {
        clearTimeout(delay)
      }
    } else {
      setState(draft => {
        draft.show = "neither"
      })
    }
  }, [state.searchTerm])

  // Sends a call to API, when a result is received
  useEffect(() => {
    if (state.requestCount) {
      // Sends request to backend
      const ourRequest = axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1.0/tweets/user/search/${state.searchTerm}`)
          setState(draft => {
            draft.results = response.data
            draft.show = "results"
          })
          console.log(state.results)
        } catch (e) {
          setState(draft => {
            draft.show = "neither"
          })
          console.log(e.response.data)
        }
      }
      fetchResults()
      return () => ourRequest.cancel()
    }
  }, [state.requestCount])

  function searchKeyPressHandler(e) {
    if (e.keyCode === 27) {
      globalDispatch({ type: "closeSearch" })
    }
  }

  function handleSearch(e) {
    globalDispatch({ type: "closeSearch" })
  }

  function handleInput(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchTerm = value
    })
  }

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <input onChange={handleInput} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="Search for a user" />
          <span onClick={handleSearch} className="close-live-search">
            {" "}
            <img src={xSquare} alt="Delete" width="40px"></img>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className={"circle-loader " + (state.show === "loading" ? "circle-loader--visible" : "")}></div>
          <div className={"live-search-results " + (state.show === "results" ? "live-search-results--visible" : "")}>
            {Boolean(state.results.length) && (
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> {state.results.length} {state.results.length > 1 ? "items" : "item"} found
                </div>

                {state.results.map(user => {
                  return (
                    <Link key={user.id} to={`/${user.username}`} onClick={() => globalDispatch({ type: "closeSearch" })} className="list-group-item list-group-item-action">
                      <img className="rounded-circle" alt="User Profile" src={defaultUser} width="100px" />
                      <span className="text-muted small"> User : </span>
                      <strong>{user.username}</strong>
                    </Link>
                  )
                })}
              </div>
            )}
            {!Boolean(state.results.length) && <p className="alert alert-danger text-center shadow-sm">Sorry, we could not find the user with that name</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
