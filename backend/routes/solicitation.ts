import { Router } from 'express'
import { UstTableIds } from 'shared/types'
import { knex } from '../database'

const router = Router()

router.get('/', async function (req, res) {
  try {
    const solicitations = await knex('solicitation as s')
      .sum('ust as ust')
      .select('coordination', 'month')
      .groupBy('coordination', 'month')

    res.json(solicitations)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.post('/', async function (req, res) {
  try {
    const { user } = req.session
    if (!user) throw new Error('user is not authenticated')
    const insertArray = (req.body as UstTableIds[]).map(
      ({ month, cell, activity, coordination, UST }) => ({
        month,
        cell_id: cell,
        activity_id: activity,
        user_id: user.id,
        coordination,
        ust: UST,
      })
    )

    await knex('solicitation').insert(insertArray, 'id')
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const solicitationRouter = router
