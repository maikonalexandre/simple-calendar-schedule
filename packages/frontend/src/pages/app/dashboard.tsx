import { ptBR } from 'date-fns/locale'

import { Pagination } from '@/components/pagination'
import { Calendar } from '@/components/ui/calendar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function Dashboard() {
  return (
    <div className="flex gap-2 px-3">
      <div className="space-y-2">
        <Calendar className="rounded bg-zinc-800" locale={ptBR} />
      </div>

      <div className="flex w-full flex-col rounded bg-zinc-800 p-4">
        <Pagination />

        <Table className="w-full">
          <TableHeader>
            <TableRow className="grid grid-cols-7 items-center align-middle">
              {/* <TableHead></TableHead> */}
              <TableHead>
                <div>
                  <span>Seg</span>
                </div>
                <div>
                  <span>24</span>
                </div>
              </TableHead>
              <TableHead>Terça</TableHead>
              <TableHead>Quarta</TableHead>
              <TableHead>Quinta</TableHead>
              <TableHead>Sexta</TableHead>
              <TableHead>Sábado</TableHead>
              <TableHead>Domingo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 8, 9, 2, 3, 4, 5, 6, 7].map((invoice) => (
              <TableRow
                key={invoice}
                className="grid grid-cols-7 items-center justify-items-center align-middle"
              >
                {/* <TableCell className="flex h-full w-full p-3 text-sm">
                  {invoice}
                </TableCell> */}
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>{' '}
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>{' '}
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>{' '}
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>{' '}
                <TableCell className="flex h-full w-full p-3 text-sm hover:bg-foreground"></TableCell>{' '}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
