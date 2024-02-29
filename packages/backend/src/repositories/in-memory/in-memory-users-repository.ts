// import { Prisma, User } from '@prisma/client'
// import { UsersRepository } from '../users-repository'

// export class InMemoryUserRepository implements UsersRepository {
//   public users: Prisma.UserCreateInput[] = []
//   async create(data: Prisma.UserCreateInput) {
//     return new Promise<User>((resolve) => {
//       this.users.push(data)
//       resolve(data)
//     })
//   }
// }
