import { Calendar } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <div className="w-96 overflow-hidden rounded-md">
      <div className="space-y-6 p-6 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <Calendar />
          <h1>Calendar Schedule </h1>
        </div>

        <div>
          <span>Faça seu login </span>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          id="login"
          className="space-y-2"
        >
          <Label htmlFor="email">Email</Label>
          <Input className="dark:bg-zinc-800" />

          <Label htmlFor="password">Senha</Label>
          <Input className="dark:bg-zinc-800" id="password" />
        </form>
        <Button form="login" variant="ghost">
          Entrar
        </Button>
        <Button className="text-sm font-light " form="login" variant="link">
          Criar uma nova conta
        </Button>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
    </div>
  )
}
