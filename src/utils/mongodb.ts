import mongoose from "mongoose"

async function dbConnection() {
  await mongoose.connect('mongodb://127.0.0.1:27017/reservaya').then((v) => {
    console.log("Connected to DB.")
  }).catch((e) => {
    console.error(e)
  })
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default dbConnection