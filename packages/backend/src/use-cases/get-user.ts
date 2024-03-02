import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetUserProps {
  userId: string
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProps) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
