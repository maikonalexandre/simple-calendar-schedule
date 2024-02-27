import { Calendar } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <div className="w-96 overflow-hidden rounded-md">
      <div className="space-y-6 bg-zinc-800 p-6">
        <div className="flex items-center gap-4">
          <Calendar />
          <h1>Calendar Schedule </h1>
        </div>

        <div>
          <span>Faça seu login </span>
        </div>

        <form id="login" className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" />

          <Label htmlFor="password">Senha</Label>
          <Input id="password" />
        </form>
        <Button form="login" variant="ghost">
          Cadastrar
        </Button>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
    </div>
  )
}
