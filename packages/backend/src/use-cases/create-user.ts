import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface createUserProps {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: createUserProps) {
    const password_hash = await hash(password, 3)

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
