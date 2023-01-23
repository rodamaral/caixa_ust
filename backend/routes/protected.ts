import { Router } from 'express'
import { activityRouter } from './activity'
import { reportRouter } from './report'
import { testRouter } from './test'

const router = Router()

router.use((req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.sendStatus(401)
  }
})

router.use('/activity', activityRouter)
router.use('/report', reportRouter)
router.use('/test', testRouter)

export const protectedRouter = router
