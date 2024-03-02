import { Calendar, User } from 'lucide-react'

export function Header({ username }: { username: string }) {
  return (
    <div className="flex w-full items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <Calendar size={20} />
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">{username}</span>
        <User size={18} />
      </div>
    </div>
  )
}
