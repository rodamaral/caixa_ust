import { Router } from 'express'
import { Report } from 'shared/types'
import { permissions } from '../constants'
import { knex } from '../database'

const router = Router()

router.use((req, res, next) => {
  if (req.session.user?.permissions.includes(permissions.relatorio)) {
    next()
  } else {
    res.sendStatus(401)
  }
})

router.get('/', async function (req, res) {
  try {
    const solicitations = await knex<Report>('solicitation as s')
      .sum('ust as ust')
      .select('coordination', 'month')
      .groupBy('coordination', 'month')

    res.json(solicitations)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const reportRouter = router
