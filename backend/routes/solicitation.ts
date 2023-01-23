import { Router } from 'express'
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
    const { month, cellId, activityId, coordination, ust } = req.body

    await knex('solicitation').insert(
      [
        {
          month,
          cell_id: cellId,
          activity_id: activityId,
          user_id: user.id,
          coordination,
          ust,
        },
      ],
      ['id']
    )
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const solicitationRouter = router
