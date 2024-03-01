import { subDays, addHours } from 'date-fns'
import { prisma } from '../src/lib/prisma'
import { hash } from 'bcryptjs'

import { getWeekInterval } from '../src/utils/index'

async function seed() {
  await prisma.user.create({
    data: {
      email: 'teste@email.com',
      name: 'Nome teste',
      password_hash: await hash('123456', 3),
      id: '123',
    },
  })

  const currentDate = new Date()
  const sevenDaysAgo = subDays(currentDate, 7)

  const weekInterval = getWeekInterval(sevenDaysAgo, currentDate)

  for (const day in weekInterval) {
    await prisma.event.create({
      data: {
        date: weekInterval[day],
        description: `Evento ${day} description`,
        finalizedAt: addHours(weekInterval[day], 1),
        startedAt: weekInterval[day],
        name: `Evento ${day}`,
        userId: '123',
      },
    })
  }
}

seed()
