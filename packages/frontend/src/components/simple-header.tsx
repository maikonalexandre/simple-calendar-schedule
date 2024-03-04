import { Calendar } from 'lucide-react'

export const SimpleHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4 align-middle text-zinc-200">
      <Calendar />
      <span className="unde font-semibold">{title}</span>
    </div>
  )
}
