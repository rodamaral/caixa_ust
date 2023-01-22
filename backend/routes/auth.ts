import { Router } from 'express'
import { User } from 'shared/types'

const users: User[] = [
  {
    id: 1,
    name: 'user1',
    permissions: ['relatorio'],
  },
  {
    id: 2,
    name: 'user2',
    permissions: ['macrocelula'],
  },
  {
    id: 3,
    name: 'user3',
    permissions: ['relatorio', 'solicitacao', 'macrocelula'],
  },
]

const router = Router()

router.get('/user', function (req, res) {
  const { user } = req.session
  if (user) {
    res.json(user)
  }
  res.sendStatus(401)
})

router.post('/login', function (req, res) {
  const { username, password } = req.body
  const session = req.session

  // TODO
  const user = users.find(({ name }) => name === username)
  if (user /* && password */) {
    session.user = user
    res
      .status(201)
      .json({ ...user, success: true, sessionID: req.sessionID, session })
  }
  res.status(401).json({ success: false })
})

export const authRouter = router
