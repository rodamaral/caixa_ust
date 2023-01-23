import { Router } from 'express'
import { knex } from '../database'

const router = Router()

router.get('/', async function (req, res) {
  try {
    const activities = await knex
      .select('id', 'name', 'description')
      .from('activity')
    res.json(activities)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const activityRouter = router
