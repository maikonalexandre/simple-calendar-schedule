import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => email === user.email) || null

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => id === user.id) || null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'userId',
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
    }

    this.users.push(user)

    return user
  }
}
