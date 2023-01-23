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
  const [weighting, setWeighting] = useState<number>()
  const [effort, setEffort] = useState<number>()
  const [simultaneity, setSimultaneity] = useState<number>()
  const [workingDays, setWorkingDays] = useState<number>()
  const [nonWorkingDays, setNonWorkingDays] = useState<number>()
  const [loading, setLoading] = useState(false)

  const disabled = month === undefined

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
    setCell(undefined)
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
      setMonth(undefined)
      setCoordination(undefined)
      setMacrocell(undefined)
      setCell(undefined)
      setActivity(undefined)
      setComplexity(undefined)
      setWeighting(undefined)
      setEffort(undefined)
      setSimultaneity(undefined)
      setWorkingDays(undefined)
      setNonWorkingDays(undefined)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.row}>
        <h1>Solicitação UST</h1>
        <NavLink to={-1 as unknown as string}>Voltar</NavLink>
      </div>

      <div className={styles.row}>
        <div className={styles.box}>
          Mês/Ano
          <select name="month" onChange={onChangeMonth} value={month}>
            <option value="">Escolha uma opção</option>
            {MONTHS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          Coordenação
          <select
            name="coordination"
            onChange={onChangeCoordination}
            value={coordination}
            disabled={disabled}
          >
            <option value="">Escolha uma opção</option>
            {coordinations.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          Macrocélula
          <select
            name="macrocell"
            onChange={onChangeMacrocell}
            value={macrocell}
            disabled={disabled}
          >
            <option value="">Escolha uma opção</option>
            {macrocells.map(({ macroId, macroName }) => (
              <option key={macroId} value={macroId}>
                {macroName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.box}>
          Célula
          <select
            name="cell"
            onChange={onChangeCell}
            value={cell}
            disabled={disabled || !macrocell}
          >
            <option value="">Escolha uma opção</option>
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
            <option value="">Escolha uma opção</option>
            {activities.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.box}>
          Descrição Atividade
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
            <option value="">Escolha uma opção</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className={styles.box}>
          Fator de ponderação
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
          Esforço (horas)
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
          Dias úteis
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
          Dias não úteis
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
        <button onClick={onInclude} disabled={!enableInclude}>
          Incluir
        </button>
        UST: {ust ?? 'a computar'}
      </div>

      <div className={styles.row}>
        <SolicitationTable data={rowsComplete} />
      </div>

      <div>
        <span>Total UST&apos;s: 560</span>
        <SaveDialog disable={!loading && rows.length === 0} onSave={onSave} />
      </div>
    </form>
  )
}
