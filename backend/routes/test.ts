import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.json({ message: req.originalUrl })
})

export const testRouter = router
