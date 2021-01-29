import { Comment } from "../../models/index.js"

class CommentSeeder {
  static async seed() {
    const commentsData = [
      {
        title: "Thanks for the recommendation",
        content: "Did the same trip and loved it!",
        tripId: 1,
        userId: 1,
      },
      {
        title: "Bagan was great!",
        content: "Followed your itinerary and enjoyed every second! Thank you!",
        tripId: 2,
        userId: 1,
      },
      {
        title: "Loved the town, didn't love the accommodation",
        tripId: 2,
        userId: 2,
      },
      {
        title: "It is!",
        content: "Spent most of my time in Tel Aviv",
        tripId: 4,
        userId: 2,
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
