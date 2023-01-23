import { ChangeEventHandler, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { round } from '~/utils'
import { coordinations, ustData } from '../../../backend/constants'
import { Activity, Cell, MONTHS } from '../../../shared/types'
import { SolicitationTable } from '../SolicitationTable'

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
  const [month, setMonth] = useState<string>()
  const [coordination, setCoordination] = useState<string>()
  const [macrocell, setMacrocell] = useState<number>()
  const [cell, setCell] = useState<number>()
  const [activityName, setActivityName] = useState<string>()
  const [complexity, setComplexity] = useState<string>()
  const [weighting, setWeighting] = useState<number>()
  const [effort, setEffort] = useState<number>()
  const [simultaneity, setSimultaneity] = useState<number>()
  const [workingDays, setWorkingDays] = useState<number>()
  const [nonWorkingDays, setNonWorkingDays] = useState<number>()

  const disabled = month === undefined

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

  const selectedActivity = activities.find(({ name }) => name === activityName)
  const description = selectedActivity?.description
  const ust = useMemo(
    () => calcUST(weighting, effort, simultaneity, workingDays, nonWorkingDays),
    [weighting, effort, simultaneity, workingDays, nonWorkingDays]
  )

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
    setActivityName(e.target.value || undefined)
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
    console.log('month', month)
    console.log('coordination', coordination)
    console.log('cell', cell)
    console.log('macrocell', macrocell)
    console.log('activityName', activityName)
    console.log('complexity', complexity)
    console.log('weighting', weighting)
    console.log('effort', effort)
    console.log('simultaneity', simultaneity)
    console.log('workingDays', workingDays)
    console.log('nonWorkingDays', nonWorkingDays)
    alert('incluir')
  }

  const onSave = () => {
    alert('save')
  }

  return (
    <form
      style={{ border: '2px solid red' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <h2>Solicitação UST</h2>
        <NavLink to={-1 as unknown as string}>Voltar</NavLink>
      </div>

      <div>
        <div>
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

        <div>
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

        <div>
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

        <div>
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

      <div>
        <div>
          Atividade
          <select
            name="activity-name"
            onChange={onChangeActivityName}
            value={activityName}
            disabled={disabled}
          >
            <option value="">Escolha uma opção</option>
            {activities.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Descrição Atividade
          <p>{description}</p>
        </div>
      </div>

      <div>
        <div>
          Complexidade
          <select
            name="complexity"
            onChange={onChangeComplexity}
            value={complexity}
            disabled={disabled}
          >
            <option value="">Escolha uma opção</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div>
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
        <div>
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

      <div>
        <div>
          Simultaneidade
          <input
            type="number"
            onChange={onChangeSimultaneity}
            value={simultaneity}
            disabled={disabled}
            min={0}
          />
        </div>
        <div>
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
        <div>
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

      <div>
        <button onClick={onInclude}>Incluir</button>
        UST: {ust ?? 'a computar'}
      </div>

      <div>
        <SolicitationTable data={ustData} />
      </div>

      <div>
        <span>Total UST&apos;s: 560</span>
        <button onClick={onSave}>Salvar</button>
      </div>
    </form>
  )
}
