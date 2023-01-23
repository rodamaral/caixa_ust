import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import styles from './ReportTable.module.scss'

const months: {
  label: string
  key: `month${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`
}[] = [
  { label: 'Jan', key: 'month1' },
  { label: 'Fev', key: 'month2' },
  { label: 'Mar', key: 'month3' },
  { label: 'Abr', key: 'month4' },
  { label: 'Mai', key: 'month5' },
  { label: 'Jun', key: 'month6' },
  { label: 'Jul', key: 'month7' },
  { label: 'Ago', key: 'month8' },
  { label: 'Set', key: 'month9' },
  { label: 'Out', key: 'month10' },
  { label: 'Nov', key: 'month11' },
  { label: 'Dez', key: 'month12' },
]

const columnHelper = createColumnHelper<Data>()

type Data = {
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

const monthsColumns = months.map(({ label, key }) =>
  columnHelper.accessor(key, {
    header: () => `${label}/2023`,
    cell: (info) => info.renderValue(),
  })
)

const columns = [
  columnHelper.accessor('coordination', {
    header: 'Coordenação',
    cell: (info) => info.getValue(),
  }),
  ...monthsColumns,
  columnHelper.accessor('total', {
    header: 'Total',
    cell: (info) => info.getValue(),
  }),
]

interface ReportTableProps {
  data: DataOmitTotal[]
}

export const ReportTable = ({ data: defaultData }: ReportTableProps) => {
  const data = useMemo(
    () =>
      defaultData.map((row) => ({
        ...row,
        total: months.reduce((acc, val) => (row[val.key] ?? 0) + acc, 0),
      })),
    [defaultData]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
