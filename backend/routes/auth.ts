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

  if (!databaseUser || !comparePasswords(password, databaseUser.password)) {
    return res.status(401).json({ success: false })
  }

  session.user = databaseUser
  // FIXME: remove sensible data and the hashed password
  return res.status(201).json({
    ...databaseUser,
    success: true,
    sessionID: req.sessionID,
    session,
  })
})

export const authRouter = router
