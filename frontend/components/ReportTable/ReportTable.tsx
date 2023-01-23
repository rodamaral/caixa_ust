import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Data, Month } from 'shared/types'
import styles from './ReportTable.module.scss'

export const months: Month[] = [
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
  data: Data[]
}

export const ReportTable = ({ data }: ReportTableProps) => {
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
