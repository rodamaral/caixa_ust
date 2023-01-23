import { Router } from 'express'
import { Report } from 'shared/types'
import { knex } from '../database'

const router = Router()

router.get('/', async function (req, res) {
  try {
    const solicitations = await knex<Report>('solicitation as s')
      .sum('ust as ust')
      // .leftJoin('cell', function () {
      //   this.on('s.cell_id', '=', 'cell.id')
      // })
      // .leftJoin('macrocell as macro', function () {
      //   this.on('cell.macrocell_id', '=', 'macro.id')
      // })
      // .leftJoin('activity as a', function () {
      //   this.on('s.activity_id', '=', 'a.id')
      // })
      .select('coordination', 'month')
      .groupBy('coordination', 'month')

    res.json(solicitations)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const reportRouter = router
