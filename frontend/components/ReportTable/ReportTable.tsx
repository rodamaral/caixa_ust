import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Data, Month, MONTHS } from '../../../shared/types'
import styles from './ReportTable.module.scss'

export const months: Month[] = [
  { label: 'Jan/2023' },
  { label: 'Fev/2023' },
  { label: 'Mar/2023' },
  { label: 'Abr/2023' },
  { label: 'Mai/2023' },
  { label: 'Jun/2023' },
  { label: 'Jul/2023' },
  { label: 'Ago/2023' },
  { label: 'Set/2023' },
  { label: 'Out/2023' },
  { label: 'Nov/2023' },
  { label: 'Dez/2023' },
]

const columnHelper = createColumnHelper<Data>()

const monthsColumns = MONTHS.map((label) =>
  columnHelper.accessor(label, {
    header: () => label,
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
