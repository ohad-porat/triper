import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"


const TripForm = (props) => {
  const [form, setForm] = useState({
    title: "",
    continent: "",
    country: "",
    city: "",
    numberOfDays: "",
    description: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])

  const addNewTrip = async () => {
    try {
      const response = await fetch("/api/v1/trips", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(form)
      })
      if (!response.ok) {
        if (response.status == 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const body = await response.json()
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = event => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewTrip()
  }


  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return(
    <form className="form" onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <label htmlFor="title"> Title of the Trip
        <input 
        type="text"
        id="title"
        name="title"
        onChange={handleInputChange}
        value={form.title}
        />
      </label>

      <label htmlFor="continent"> Continent
        <input 
        type="text"
        id="continent"
        name="continent"
        onChange={handleInputChange}
        value={form.continent}
        />
      </label>

      <label htmlFor="country"> Country
        <input 
        type="text"
        id="country"
        name="country"
        onChange={handleInputChange}
        value={form.country}
        />
      </label>

      <label htmlFor="city"> City
        <input 
        type="text"
        id="city"
        name="city"
        onChange={handleInputChange}
        value={form.city}
        />
      </label>

      <label htmlFor="numberOfDays"> Number of Days
        <input 
        type="number"
        id="numberOfDays"
        name="numberOfDays"
        onChange={handleInputChange}
        value={form.number}
        />
      </label>

      <label htmlFor="description"> Description
        <textarea 
        name="description"
        id="description"
        onChange={handleInputChange}
        value={form.description}
        />
      </label>

      <div>
        <input type="submit" value="Submit" />
      </div>

    </form>
  )
}



export default TripForm