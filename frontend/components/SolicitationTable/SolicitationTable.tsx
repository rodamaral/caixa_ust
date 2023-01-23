import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { UstTable } from 'shared/types'
import styles from './SolicitationTable.module.scss'

const columnHelper = createColumnHelper<UstTable>()

const columns = [
  columnHelper.accessor('month', {
    header: 'Mês/Ano',
  }),
  columnHelper.accessor('coordination', {
    header: 'Coordenação',
  }),
  columnHelper.accessor('macrocell', {
    header: 'Macrocélula',
  }),
  columnHelper.accessor('cell', {
    header: 'Célula',
  }),
  columnHelper.accessor('activity', {
    header: 'Atividade',
  }),
  columnHelper.accessor('UST', {
    header: 'UST',
  }),
]

interface SolicitationProps {
  data: UstTable[]
}

export const SolicitationTable = ({ data }: SolicitationProps) => {
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
            <th>#</th>

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
        {table.getRowModel().rows.map((row, index) => (
          <tr key={row.id}>
            <td>{index}</td>

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
