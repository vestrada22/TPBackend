const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')


const createUser = async (req, res = response) => {

  const { name, email, password, role } = req.body
  try {

    // check email
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'The user already exist'
      })
    }

    // create user with model
    const dbUser = new User(req.body)

    // cipher password
    const salt = bcrypt.genSaltSync()
    dbUser.password = bcrypt.hashSync(password, salt)

    // save user in database
    await dbUser.save()

    // generate JWT
    const token = await generateJWT(dbUser.id, name)
    // generate response
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      role,
      token,
      message: 'the user has been created successfully!'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Opps something went wrong!'
    })
  }


}

const login = async(req, res = response) => {

  const { email, password } = req.body
  try {

    const dbUser = await User.findOne({ email })
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        message: 'the credentials are wrong'
      })
    }

    const verifyPassword = bcrypt.compareSync(password, dbUser.password)
    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        message: 'the credentials are wrong'
      })
    }

    // generate JWT
    const token = await generateJWT(dbUser.id, dbUser.name)

    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      role: dbUser.role,
      token,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Opps something went wrong!'
    })
  }
}

const renewToken = async (req, res = response) => {

  const { uid, } = req

  const dbUser = await User.findById(uid)

  const token = await generateJWT(uid, dbUser.name)

  return res.json({
    ok: true,
    uid,
    name: dbUser.name,
    role: dbUser.role,
    token
  })
}


module.exports = {
  createUser,
  login,
  renewToken
}