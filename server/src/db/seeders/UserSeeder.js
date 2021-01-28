import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "john_francona@gmail.com",
        cryptedPassword: "triptrip",
        userName: "tomatotriper"
      },
      {
        email: "lebron.james@yahoo.com",
        cryptedPassword: "triptrip",
        userName: "lebron23"
      },
      {
        email: "ben.kim12@gmail.com",
        cryptedPassword: "triptrip",
        userName: "bennytriper"
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
