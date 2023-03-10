import { ChangeEventHandler, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { round } from '~/utils'
import { coordinations } from '../../../backend/constants'
import { Activity, Cell, MONTHS, UstTableIds } from '../../../shared/types'
import { SolicitationTable } from '../SolicitationTable'
import { SaveDialog } from './SaveDialog'
import styles from './Solicitation.module.scss'

type MaybeNumber = number | undefined
const calcUST = (
  weighting: MaybeNumber,
  effort: MaybeNumber,
  simultaneity: MaybeNumber,
  workingDays: MaybeNumber,
  nonWorkingDays: MaybeNumber
) => {
  if (
    weighting !== undefined &&
    weighting >= 0 &&
    !isNaN(weighting) &&
    effort !== undefined &&
    effort >= 0 &&
    !isNaN(effort) &&
    simultaneity !== undefined &&
    simultaneity >= 0 &&
    !isNaN(simultaneity) &&
    workingDays !== undefined &&
    workingDays >= 0 &&
    !isNaN(workingDays) &&
    nonWorkingDays !== undefined &&
    nonWorkingDays >= 0 &&
    !isNaN(nonWorkingDays)
  )
    return round(
      weighting * effort * simultaneity * (workingDays + nonWorkingDays)
    )
  return null
}

interface SolicitationProps {
  activities: Activity[]
  cells: Cell[]
}

export const Solicitation = ({ activities, cells }: SolicitationProps) => {
  const [rows, setRows] = useState<UstTableIds[]>([])
  const [month, setMonth] = useState<string>()
  const [coordination, setCoordination] = useState<string>()
  const [macrocell, setMacrocell] = useState<number>()
  const [cell, setCell] = useState<number>()
  const [activity, setActivity] = useState<number>()
  const [complexity, setComplexity] = useState<string>()
  const [weighting, setWeighting] = useState<number>(0)
  const [effort, setEffort] = useState<number>(0)
  const [simultaneity, setSimultaneity] = useState<number>(0)
  const [workingDays, setWorkingDays] = useState<number>(0)
  const [nonWorkingDays, setNonWorkingDays] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const disabled = !month

  const rowsComplete = rows.map(({ cell, activity, ...rest }) => {
    const selectedCellComplete = cells.find(({ cellId }) => cellId === cell)
    const activityComplete = activities.find(({ id }) => id === activity)
    return {
      ...rest,
      cell: selectedCellComplete?.cellName ?? '',
      macrocell: selectedCellComplete?.macroName ?? '',
      activity: activityComplete?.name ?? '',
    }
  })
  const totalUST = rowsComplete.reduce((acc, val) => acc + val.UST, 0)

  const macrocells = Object.values(
    cells.reduce((acc, val) => {
      const id = val.macroId
      if (!acc[id]) {
        acc[id] = val
      }
      return acc
    }, {} as Record<string, Cell>)
  )
  const cellsOfMacrocell = Object.values(
    cells.reduce((acc, val) => {
      if (!acc[val.cellId]) {
        if (macrocell === val.macroId) {
          acc[val.cellId] = val
        }
      }
      return acc
    }, {} as Record<string, Cell>)
  )

  const selectedActivity = activities.find(({ id }) => id === activity)
  const description = selectedActivity?.description
  const ust = useMemo(
    () => calcUST(weighting, effort, simultaneity, workingDays, nonWorkingDays),
    [weighting, effort, simultaneity, workingDays, nonWorkingDays]
  )

  const enableInclude =
    activity && cell && coordination && month && ust && macrocell && !loading

  const onChangeMonth: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMonth(e.target.value || undefined)
  }

  const onChangeCoordination: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCoordination(e.target.value || undefined)
  }

  const onChangeMacrocell: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMacrocell(parseInt(e.target.value) || undefined)
    setCell(0)
  }

  const onChangeCell: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCell(parseInt(e.target.value) || undefined)
  }

  const onChangeActivityName: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setActivity(parseInt(e.target.value) || undefined)
  }

  const onChangeComplexity: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setComplexity(e.target.value || undefined)
  }

  const onChangeWeighting: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWeighting(e.target.valueAsNumber ?? undefined)
  }

  const onChangeEffort: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEffort(e.target.valueAsNumber ?? undefined)
  }

  const onChangeSimultaneity: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSimultaneity(e.target.valueAsNumber ?? undefined)
  }

  const onChangeWorkingDays: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWorkingDays(e.target.valueAsNumber ?? undefined)
  }

  const onChangeNonWorkingDays: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNonWorkingDays(e.target.valueAsNumber ?? undefined)
  }

  const onInclude = () => {
    if (activity && cell && coordination && month && ust && macrocell) {
      setRows((rows) => [
        ...rows,
        {
          activity,
          cell,
          coordination,
          macrocell,
          month,
          UST: ust,
        },
      ])
      setMonth('')
    }
  }

  const onSave = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/solicitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
      })
      if (!res.ok) {
        console.error(res)
        throw new Error('res not ok')
      }
      setRows([])
      setMonth('')
      setCoordination('')
      setMacrocell(0)
      setCell(0)
      setActivity(0)
      setComplexity('')
      setWeighting(0)
      setEffort(0)
      setSimultaneity(0)
      setWorkingDays(0)
      setNonWorkingDays(0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.row}>
        <h1>Solicita????o UST</h1>
        <NavLink to={-1 as unknown as string}>Voltar</NavLink>
      </div>

      <div className={styles.row}>
        <div className={styles.box}>
          M??s/Ano
          <select name="month" onChange={onChangeMonth} value={month}>
            <option value="">Escolha uma op????o</option>
            {MONTHS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          Coordena????o
          <select
            name="coordination"
            onChange={onChangeCoordination}
            value={coordination}
            disabled={disabled}
          >
            <option value="">Escolha uma op????o</option>
            {coordinations.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          Macroc??lula
          <select
            name="macrocell"
            onChange={onChangeMacrocell}
            value={macrocell}
            disabled={disabled}
          >
            <option value="">Escolha uma op????o</option>
            {macrocells.map(({ macroId, macroName }) => (
              <option key={macroId} value={macroId}>
                {macroName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          C??lula
          <select
            name="cell"
            onChange={onChangeCell}
            value={cell}
            disabled={disabled || !macrocell}
          >
            <option value="">Escolha uma op????o</option>
            {cellsOfMacrocell.map(({ cellId, cellName }) => (
              <option key={cellId} value={cellId}>
                {cellName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.box}>
          Atividade
          <select
            name="activity-name"
            onChange={onChangeActivityName}
            value={activity}
            disabled={disabled}
          >
            <option value="">Escolha uma op????o</option>
            {activities.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.box}>
          Descri????o Atividade
          <div className={styles.description}>{description}</div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.box}>
          Complexidade
          <select
            name="complexity"
            onChange={onChangeComplexity}
            value={complexity}
            disabled={disabled}
            className={styles.input}
          >
            <option value="">Escolha uma op????o</option>
            <option value="Baixa">Baixa</option>
            <option value="M??dia">M??dia</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className={styles.box}>
          Fator de pondera????o
          <input
            type="number"
            step="0.01"
            onChange={onChangeWeighting}
            value={weighting}
            disabled={disabled}
            min={0}
          />
        </div>
        <div className={styles.box}>
          Esfor??o (horas)
          <input
            type="number"
            onChange={onChangeEffort}
            value={effort}
            disabled={disabled}
            min={0}
            max={24}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.box}>
          Simultaneidade
          <input
            type="number"
            onChange={onChangeSimultaneity}
            value={simultaneity}
            disabled={disabled}
            min={0}
          />
        </div>
        <div className={styles.box}>
          Dias ??teis
          <input
            type="number"
            onChange={onChangeWorkingDays}
            value={workingDays}
            disabled={disabled}
            min={0}
            max={22}
          />
        </div>
        <div className={styles.box}>
          Dias n??o ??teis
          <input
            type="number"
            onChange={onChangeNonWorkingDays}
            value={nonWorkingDays}
            disabled={disabled}
            min={0}
            max={31}
          />
        </div>
      </div>

      <div className={styles.row}>
        <button
          onClick={onInclude}
          disabled={!enableInclude}
          className={styles.button}
        >
          Incluir
        </button>
      </div>

      <div className={styles.row}>
        <SolicitationTable data={rowsComplete} />
      </div>

      <div className={styles.row}>
        <span>Total UST&apos;s: {totalUST}</span>
        <SaveDialog disable={!loading && rows.length === 0} onSave={onSave} />
      </div>
    </form>
  )
}
