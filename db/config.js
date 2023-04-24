const mongoose = require('mongoose')

const databaseConnection = async () => {

  try {
    await mongoose.connect(process.env.MDB_CONNECTION)
    console.log("Database running")
  } catch (error) {
    console.log(error)
    throw error
  }

}

module.exports = {
  databaseConnection
}