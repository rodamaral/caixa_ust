import { Router } from 'express'
import { knex } from '../database'
import { comparePasswords } from '../utils/crypto'

const router = Router()

router.get('/user', function (req, res) {
  const { user } = req.session
  if (user) {
    res.json(user)
  }
  res.sendStatus(401)
})

router.post('/login', async function (req, res) {
  const { username, password } = req.body
  const session = req.session

  const databaseUser = await knex
    .select('id', 'name', 'password', 'permissions')
    .from('user')
    .where('name', '=', username)
    .first()
  console.warn('foo', databaseUser)
  if (!databaseUser) return res.status(401).json({ success: false })
  const comparison = comparePasswords(password, databaseUser.password)
  console.warn('comparison', comparison)

  if (comparison) {
    session.user = databaseUser
    return res.status(201).json({
      ...databaseUser,
      success: true,
      sessionID: req.sessionID,
      session,
    })
  }
  res.status(401).json({ success: false })
})

// TEST: register user
// router.post('/login', async function (req, res) {
//   const { username, password } = req.body

//   const result = await pg('user').insert({
//     name: username,
//     permissions: [],
//     password: hashPassword(password),
//   })

//   console.log('result', result)

//   res.sendStatus(201)
// })

export const authRouter = router
