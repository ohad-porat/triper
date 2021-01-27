import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import TripsList from "./layout/TripsList"
import TripShow from "./layout/TripShow"
import TripForm from "./layout/TripForm"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={TripsList} />
        <Route exact path="/new-trip" component={TripForm} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/:id" component={TripShow} />
      </Switch>
    </Router>
  )
}

export default hot(App)
