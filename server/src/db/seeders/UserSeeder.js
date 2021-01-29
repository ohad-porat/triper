import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "aaa@blah.com",
        password: "password1"
      },
      {
        email: "bbb@blah.com",
        password: "password2"
      },
    ]

    for (const singleUserData of usersData) {
      const currentUser = await User.query().findOne({
        email: singleUserData.email,
      })
      if (!currentUser) {
        await User.query().insert(singleUserData)
      }
    }
  }
}

export default UserSeeder