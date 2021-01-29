import { Comment, User, Trip } from "../../models/index.js"

class CommentSeeder {
  static async seed() {
    const john = await User.query().findOne({ userName: "tomatotriper"})
    const lebron = await User.query().findOne({ userName: "lebron23"})

    const berlin = await Trip.query().findOne({city: "Berlin"})
    const bagan = await Trip.query().findOne({city: "Bagan" })
    const israel = await Trip.query().findOne({country: "Israel" })
    
    const commentsData = [
      {
        title: "Thanks for the recommendation",
        content: "Did the same trip and loved it!",
        tripId: berlin.id,
        userId: john.id,
      },
      {
        title: "Bagan was great!",
        content: "Followed your itinerary and enjoyed every second! Thank you!",
        tripId: bagan.id,
        userId: john.id,
      },
      {
        title: "Loved the town, didn't love the accommodation",
        tripId: bagan.id,
        userId: lebron.id,
      },
      {
        title: "It is!",
        content: "Spent most of my time in Tel Aviv",
        tripId: israel.id,
        userId: lebron.id,
      },
    ]

    for (const singleCommentData of commentsData) {
      const currentComment = await Comment.query().findOne({
        title: singleCommentData.title,
      })
      if (!currentComment) {
        await Comment.query().insert(singleCommentData)
      }
    }
  }
}

export default CommentSeeder
