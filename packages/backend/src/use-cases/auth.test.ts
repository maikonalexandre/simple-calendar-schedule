import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { compare } from 'bcryptjs'
import { AuthUseCase } from './auth'
import { UserCredentialsError } from './errors/user-credentials-error'

let authUseCase: AuthUseCase
let usersRepository: InMemoryUserRepository

describe('Auth Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    authUseCase = new AuthUseCase(usersRepository)
  })
  test('should be able to authenticate', async () => {
    const createUser = new CreateUserUseCase(usersRepository)

    await createUser.execute({
      email: 'test@test.com',
      password: '123',
      name: 'Jhon Doe',
    })

    const { user } = await authUseCase.execute({
      email: 'test@test.com',
      password: '123',
    })

    const isHashedPassword = await compare('123', user.password_hash)

    expect(isHashedPassword).toBe(true)
  })

  test('should not be able with wrong passoword', async () => {
    const createUser = new CreateUserUseCase(usersRepository)

    await createUser.execute({
      email: 'test@test.com',
      password: '123',
      name: 'Jhon Doe',
    })

    expect(
      authUseCase.execute({
        email: 'test@test.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(UserCredentialsError)
  })

  test('should not be able with wrong email', async () => {
    expect(
      authUseCase.execute({
        email: 'jhon@jhon.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserCredentialsError)
  })
})
