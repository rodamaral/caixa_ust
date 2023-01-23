import { Router } from 'express'
import { knex } from '../database'

const router = Router()

router.get('/', async function (req, res) {
  try {
    const macrocells = await knex('macrocell as macro')
      .join('cell', function () {
        this.on('macro.id', '=', 'cell.macrocell_id')
      })
      .select([
        'macro.id as macroId',
        'macro.name as macroName',
        'cell.id as cellId',
        'cell.name as cellName',
      ])
    res.json(macrocells)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export const macrocellRouter = router
