import { Calendar } from '@/components/ui/calendar'

export function Dashboard() {
  return (
    <div className="flex gap-2 px-2">
      <div className="space-y-2">
        <Calendar className="rounded bg-zinc-800" />

        <div className="bg-zinc-800 p-2">1</div>
        <div className="bg-zinc-800 p-2">1</div>
        <div className="bg-zinc-800 p-2">1</div>
        <div className="bg-zinc-800 p-2">1</div>
      </div>
      <div>catag</div>
    </div>
  )
}
