import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import defaultUser from "../../assets/img/defaultUser.jpeg"

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
    <div className="container px-4 text-center">
      <div className="mb-3 pb-3">
        <h1>All Users</h1>
        <hr></hr>
      </div>
      <div className="row gx-5 gy-5">
        {users ? (
          users.map(user => {
            return (
              <div key={user.id} className="col-4">
                <div className="theme-blue rounded-5 p-3 shadow py-3">
                  <img className="tweet-profile mb-3" src={defaultUser} alt="Profile Pic" />
                  <br></br>
                  <div className="card rounded-5 p-3 my-3">
                    <div>
                      <h4 className="">@{user.username}</h4>
                      <hr className="w-75 mx-auto"></hr>
                    </div>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <Link key={user._id} to={`/${user.username}`} className="card-link">
                      View Tweets
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center">Looks like theres no users... yet 👀</div>
        )}
      </div>
    </div>
  )
}

export default AllUsers
