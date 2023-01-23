export interface User {
  id: number
  name: string
  permissions: string[]
}

export const MONTHS = [
  'Jan/2023',
  'Fev/2023',
  'Mar/2023',
  'Abr/2023',
  'Mai/2023',
  'Jun/2023',
  'Jul/2023',
  'Ago/2023',
  'Set/2023',
  'Out/2023',
  'Nov/2023',
  'Dez/2023',
] as const

export type Months = (typeof MONTHS)[number]

export interface Month {
  label: Months
}

export type Data = {
  [key in Months]: number
} & {
  coordination: string
  total: number
}

export type DataOmitTotal = Omit<Data, 'total'>

export interface Report {
  ust: number
  coordination: string
  month: Months
}

export type UstTable = {
  month: string
  coordination: string
  macrocell: string
  cell: string
  activity: string
  UST: number
}

export interface Activity {
  name: string
  description: string
}

export interface Cell {
  macroId: number
  macroName: string
  cellId: number
  cellName: string
}
