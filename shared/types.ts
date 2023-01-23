export interface User {
  id: number
  name: string
  permissions: string[]
}

export interface Month {
  label: string
  key: `month${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`
}

export type Data = {
  coordination: string
  month1: number
  month2: number
  month3: number
  month4: number
  month5: number
  month6: number
  month7: number
  month8: number
  month9: number
  month10: number
  month11: number
  month12: number
  total: number
}

export type DataOmitTotal = Omit<Data, 'total'>

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
