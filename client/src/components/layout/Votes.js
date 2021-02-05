import React, { useState, useEffect } from "react"

const Votes = (props) => {
  const [userVote, setUserVote] = useState({
    vote: 0,
    voted: false,
  })
  const [totalVotes, setTotalVotes] = useState(0)

  const getVote = async () => {
    try {
      const response = await fetch(`api/v1/trips/${props.tripId}/votes`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const voteData = await response.json()
      const { vote, voted } = voteData.userVote
      if (voteData.userVote) {
        setUserVote({ vote: vote, voted: voted })
      }
      setTotalVotes(voteData.totalVotes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getVote()
  }, [])

  let voteObject = {vote: null, voted: true}

  const vote = () => {
    const postVoteData = async () => {
      try {
        const response = await fetch(`/api/v1/trips/${props.tripId}/votes`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(voteObject),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const responseBody = await response.json()
          const { vote, voted } = responseBody.newVote
          setUserVote({ vote: vote, voted: voted })
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }

    const patchVoteData = async () => {
      try {
        const response = await fetch(`/api/v1/trips/${props.tripId}/votes`, {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(voteObject),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const responseBody = await response.json()
          const { vote, voted } = responseBody.newVote
          setUserVote({ vote: vote, voted: voted })
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }

    if (!userVote.voted) {
      postVoteData()
    } else {
      patchVoteData()
    }
  }

  const handleUpvote = (event) => {
    event.preventDefault()
    if (userVote.vote !== 1) {
      voteObject = { vote: 1, voted: true }
      setUserVote({ voted: true, vote: 1 })
      const newTotalVotes = totalVotes + 1
      setTotalVotes(newTotalVotes)
      vote()
    }
  }

  const handleDownvote = (event) => {
    event.preventDefault()
    if (userVote.vote !== -1) {
      voteObject = { vote: -1, voted: true }
      setUserVote({ voted: true, vote: -1 })
      const newTotalVotes = totalVotes - 1
      setTotalVotes(newTotalVotes)
      vote()
    }
  }

  return (
    <div>
      <div>
        <i className="fas fa-arrow-up" onClick={handleUpvote} />
      </div>
      <h3>{totalVotes}</h3>
      <div>
        <i className="fas fa-arrow-down" onClick={handleDownvote} />
      </div>
    </div>
  )
}

export default Votes
