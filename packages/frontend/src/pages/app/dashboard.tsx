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
        <Pagination currentDate={new Date()} />

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead>Segunda</TableHead>
              <TableHead>Terça</TableHead>
              <TableHead>Quarta</TableHead>
              <TableHead>Quinta</TableHead>
              <TableHead>Sexta</TableHead>
              <TableHead>Sábado</TableHead>
              <TableHead>Domingo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7].map((invoice) => (
              <TableRow className="" key={invoice}>
                <TableCell className="p-3 text-sm">{invoice}</TableCell>
                <TableCell className="p-3 text-sm"></TableCell>
                <TableCell className="p-3 text-sm"></TableCell>{' '}
                <TableCell className="p-3 text-sm"></TableCell>{' '}
                <TableCell className="p-3 text-sm"></TableCell>{' '}
                <TableCell className="p-3 text-sm"></TableCell>{' '}
                <TableCell className="p-3 text-sm"></TableCell>{' '}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
