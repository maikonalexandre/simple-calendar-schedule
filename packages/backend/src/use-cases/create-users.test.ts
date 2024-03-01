import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUserRepository
let createUser: CreateUserUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(usersRepository)
  })
  test('should hash password on create user', async () => {
    const user = await createUser.execute({
      email: 'test@test.com',
      name: 'Jhon Doe',
      password: '123',
    })

    const isHashedPassword = await compare('123', user.password_hash)

    expect(isHashedPassword).toBe(true)
  })

  test('should not be able to register user with same email twice', async () => {
    await createUser.execute({
      email: 'test@test.com',
      name: 'Jhon Doe',
      password: '123',
    })

    expect(
      createUser.execute({
        email: 'test@test.com',
        name: 'Jhon Doe',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  test('should be able to register user', async () => {
    const user = await createUser.execute({
      email: 'test@test.com',
      name: 'Jhon Doe',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
