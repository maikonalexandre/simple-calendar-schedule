import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/_api/register'
import { FormContainer } from '@/components/form-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name: z.string().min(3, { message: 'Preencha seu nome' }),
  email: z.string().email({ message: 'Preencha com um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 dígitos' }),
})

export function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: registerUser,
  })

  const navigate = useNavigate()

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await createAccount(data)

      if (response.status === 201) {
        toast.success('Cadastro feito com sucesso')
        navigate('/sign-in')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return toast.error('Já existe um usuário cadastrado com esse email!')
      }

      toast.error('Ouve um erro ao criar usuário!')
    }
  }

  return (
    <FormContainer subtitle="Sign in">
      <form
        id="create-account"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <Label>Nome:</Label>
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
      <Link to="/sign-in" className="ml-4 inline-block text-sm hover:underline">
        Fazer login
      </Link>
    </FormContainer>
  )
}
