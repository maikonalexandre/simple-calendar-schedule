import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form-container'
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
    <FormContainer subtitle="sign-in">
      <form onSubmit={handleSubmit(onSubmit)} id="login" className="space-y-2">
        <Label>Email</Label>
        <Input className="dark:bg-zinc-800" {...register('email')} />
        {errors.email && (
          <p className="text-xs text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}

        <Label>Senha</Label>
        <Input {...register('password')} className="dark:bg-zinc-800" />
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
        className="ml-4 inline-block text-sm hover:underline"
      >
        Criar uma nova conta
      </Link>
    </FormContainer>
  )
}
