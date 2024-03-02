import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

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

  const { signIn, isLoading } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await signIn(data.email, data.password)
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        return toast.error('Credenciais inválidas!')
      }

      toast.error('Não foi possível realizar o login!')
    }
  }
  return (
    <div className="w-96 overflow-hidden rounded-md">
      <div className="space-y-6 p-6 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <Calendar />
          <h1>Calendar Schedule </h1>
          <span className="inline-block text-sm">Faça seu login</span>
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
        <Button disabled={isLoading} form="login">
          Entrar
        </Button>
        <Link
          to="/create-account"
          className="ml-4 inline-block text-sm font-light hover:underline"
        >
          Criar uma nova conta
        </Link>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
    </div>
  )
}
