import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z.string().min(1, { message: 'Insira sua senha' }),
})

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
  }
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
          onSubmit={handleSubmit(onSubmit)}
          id="login"
          className="space-y-2"
        >
          <Label htmlFor="email">Email</Label>
          <Input className="dark:bg-zinc-800" {...register('email')} />
          {errors.email && (
            <p className="text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}

          <Label htmlFor="password">Senha</Label>
          <Input
            {...register('password')}
            className="dark:bg-zinc-800"
            id="password"
          />
          {errors.password && (
            <p className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </form>
        <Button form="login" variant="ghost">
          Entrar
        </Button>
        <Link
          to="/create-account"
          className="ml-2 inline-block text-sm font-light hover:underline"
        >
          Criar uma nova conta
        </Link>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
    </div>
  )
}
