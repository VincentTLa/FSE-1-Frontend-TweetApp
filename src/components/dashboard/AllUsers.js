import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import StateContext from "../../StateContext"
import defaultUser from "../../defaultUser.jpeg"

function AllUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1.0/tweets/users/all")
        setUsers(response.data)
      } catch (e) {
        console.log(e.response.data)
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <div className="container-lg overflow-hidden px-4 text-center">
      <h1>All Users</h1>
      <hr></hr>
      <div className="row gx-5 gy-5">
        {users.map(user => {
          return (
            <div key={user.id} className="col-4">
              <div className="inner p-3 border">
                <img className="tweet-profile" src={defaultUser} alt="Profile Pic" />
                <br></br>
                <div className="card p-3">
                  <h4>@{user.username}</h4>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <Link key={user._id} to={`/${user.username}`} className="card-link">
                    View Tweets
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllUsers
