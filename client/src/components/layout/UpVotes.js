import React, { UseState, UseEffect } from "react"

const UpVotes = (props)=>{
 const [vote, setVote] = useState({userId: "", tripId: "", vote: 0, voted: false })

 const fetchVoteData = async ()=>{
   try{
    const response = await fetch("/api/v1/tripVotes")
   }catch(error){}
 }

  return(
    <div>
      <button className="medium-12 cell submit-button-div">upvote</button>
      <button className="medium-12 cell submit-button-div">downvote</button>
    </div>
  )
}

export default UpVotes