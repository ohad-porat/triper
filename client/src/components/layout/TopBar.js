import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  const authenticatedUserPost = [
    <li key="auth-user-post">
      <Link to="/new-trip">Add a Trip</Link>
    </li>,
  ]

  const emptyLi = [<li key="emptyli"></li>]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Triper</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? authenticatedUserPost : emptyLi}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  )
}

export default TopBar
