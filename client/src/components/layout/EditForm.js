import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const EditForm = (props) => {
  const [form, setForm] = useState({
    title: "",
    continent: "",
    country: "",
    city: "",
    numberOfDays: "",
    description: "",
    userId: "",
    id: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const tripId = props.match.params.id

  const getTrip = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const tripData = await response.json()
      
      const { city, continent, country, description, id, numberOfDays, title, userId } = tripData.trip
      setForm({ city, continent, country, description, id, numberOfDays, title, userId })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTrip()
  }, [])

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const editTrip = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        if (response.status == 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/trips/${tripId}`} />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    editTrip()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ErrorList errors={errors} />

      <div className="grid-container">
        <div className="grid-x grid-padding-x">
          <div className="medium-12 cell">
            <label htmlFor="title">
              <span className="label">Title of the Trip</span>
              
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleInputChange}
                value={form.title}
              />
            </label>
          </div>

          <div className="medium-3 cell">
            <label htmlFor="continent">
              <span className="label">Continent</span>
              <input
                type="text"
                id="continent"
                name="continent"
                onChange={handleInputChange}
                value={form.continent}
              />
            </label>
          </div>

          <div className="medium-3 cell">
            <label htmlFor="country">
              <span className="label">Country</span>
              <input
                type="text"
                id="country"
                name="country"
                onChange={handleInputChange}
                value={form.country}
              />
            </label>
          </div>

          <div className="medium-4 cell">
            <label htmlFor="city">
              <span className="label">City</span>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleInputChange}
                value={form.city}
              />
            </label>
          </div>

          <div className="medium-2 cell">
            <label htmlFor="numberOfDays">
              <span className="label">Days</span>
              <input
                type="number"
                id="numberOfDays"
                name="numberOfDays"
                onChange={handleInputChange}
                value={form.numberOfDays}
              />
            </label>
          </div>

          <div className="medium-12 cell">
            <label htmlFor="description">
              <span className="label">Description</span>
              <textarea
                rows="5"
                name="description"
                id="description"
                onChange={handleInputChange}
                value={form.description}
              />
            </label>
          </div>

          <div className="medium-12 cell submit-button-div">
            <input
              type="submit"
              value="Submit"
              className="button large submit-button"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditForm