import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name: z.string().min(3, { message: 'Preencha seu nome' }),
  email: z.string().email({ message: 'Preencha com um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no minimo 6 digitos' }),
})

export function CreateAccount() {
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
          <span>Crie sua conta</span>
        </div>

        <form
          id="create-account"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <Label htmlFor="name">Nome:</Label>
          <Input id="name" className="dark:bg-zinc-800" {...register('name')} />
          {errors.name && (
            <p className="text-xs text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}

          <Label>Email:</Label>
          <Input className="dark:bg-zinc-800" {...register('email')} />
          {errors.email && (
            <p className="text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}

          <Label>Senha:</Label>
          <Input className="dark:bg-zinc-800" {...register('password')} />
          {errors.password && (
            <p className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </form>
        <Button form="create-account" type="submit">
          Criar conta
        </Button>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
    </div>
  )
}
