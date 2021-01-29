import UserSerializer from "./UserSerializer.js"

class CommentSerializer {
  static async getDetails(comment) {
    const allowedAttributes = ["id", "title", "content"]

    let serializedComment = {}
    for (const attribute of allowedAttributes) {
      serializedComment[attribute] = comment[attribute]
    }
    const user = await comment.$relatedQuery("user")
    const serializedUser = UserSerializer.getSummary(user)
    serializedComment.user = serializedUser
    return serializedComment
  }
}

export default CommentSerializer