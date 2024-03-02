import { ArrowRightCircleIcon, Calendar, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Header({
  username,
  onClick,
}: {
  username: string
  onClick: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <Calendar size={20} />
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <span className="text-sm">{username}</span>
            <User size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 rounded-md">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowRightCircleIcon className="mr-2 h-4 w-4 text-red-500" />
              <span
                onClick={() => {
                  onClick()
                }}
                className="w-full text-red-500"
              >
                LogOut
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
