import { Router } from 'express'
import { activityRouter } from './activity'
import { macrocellRouter } from './macrocell'
import { reportRouter } from './report'

const router = Router()

// router.use((req, res, next) => {
//   if (req.session.user) {
//     next()
//   } else {
//     res.sendStatus(401)
//   }
// })

router.use('/activity', activityRouter)
router.use('/macrocell', macrocellRouter)
router.use('/report', reportRouter)

export const protectedRouter = router
