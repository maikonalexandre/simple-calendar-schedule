import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserCredentialsError } from './errors/user-credentials-error'
import { User } from '@prisma/client'

interface AuthUseCaseRequest {
  email: string
  password: string
}

interface AuthUseCaseResponse {
  user: User
}

export class AuthUseCase {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.UsersRepository.findByEmail(email)

    if (!user) {
      throw new UserCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new UserCredentialsError()
    }

    return { user }
  }
}
