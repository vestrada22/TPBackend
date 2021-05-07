const mongoose = require('mongoose')

const databaseConnection = async() => {

  try {
    await mongoose.connect( process.env.MDB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("Database running")
  } catch (error) {
    console.log(error)
    throw new Error('Error')
  }

}

module.exports = {
  databaseConnection
}