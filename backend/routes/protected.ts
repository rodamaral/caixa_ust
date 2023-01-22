import { Router } from 'express'
import { testRouter } from './test'

const router = Router()

router.use((req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.sendStatus(401)
  }
})

router.use('/test', testRouter)

router.get('', function (req, res) {
  console.log('top level api route (protected)')
  res.json({ message: req.originalUrl })
})

export const protectedRouter = router
