import { Router } from 'express'

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
  if (username === 'admin' && password === 'admin') {
    session.user = { id: 1, name: username, permissions: ['RELATORIO'] }
    res
      .status(201)
      .json({ username, success: true, sessionID: req.sessionID, session })
  }
  res.status(401).json({ success: false })
})

export const authRouter = router
