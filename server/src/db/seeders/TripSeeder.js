import { Trip, User } from "../../models/index.js"

class TripSeeder {
  static async seed() {
    const john = await User.query().findOne({ userName: "tomatotriper"})
    const lebron = await User.query().findOne({ userName: "lebron23"})
    const ben = await User.query().findOne({ userName: "bennytriper"})
  
    const tripsData = [
      {
        continent: "Europe",
        country: "Germany",
        city: "Berlin",
        title: "Long Weekend In Berlin",
        numberOfDays: "4",
        description: "Fabulous 4 days of culture and night life",
        userId: lebron.id,
      },
      {
        continent: "Asia",
        country: "Myanmar",
        city: "Bagan",
        title: "History and Scenery",
        description:
          "This ancient town is filled with mind blowing history and breathtaking views",
        userId: ben.id,
      },
      {
        continent: "Africa",
        country: "South Africa",
        city: "Cape Town",
        title: "Beautiful Place With Amazing Food!",
        numberOfDays: "10",
        description:
          "I love Cape Town! It has everything you want: great hikes with beautiful views, amazing people and some of the best food I've ever had",
        userId: john.id,
      },
      {
        continent: "Asia",
        country: "Israel",
        title: "Fun place",
        description: "Great food, nice people, awesome night life",
        userId: ben.id,
      },
    ]

    for (const singleTripData of tripsData) {
      const currentTrip = await Trip.query().findOne({
        title: singleTripData.title,
      })
      if (!currentTrip) {
        await Trip.query().insert(singleTripData)
      }
    }
  }
}

export default TripSeeder
