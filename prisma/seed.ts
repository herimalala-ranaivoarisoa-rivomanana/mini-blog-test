import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {

  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  await prisma.article.createMany({
    data:[
        {
          id: '1',
          title: 'Elon Wears Two Hats During Trump Meeting in Desperate Bid for Attention',
          description: 'Meanwhile, Trump acknowledged that Christmas this year may not be so merry.',
          image: 'https://gizmodo.com/app/uploads/2025/04/elon-musk-two-hats-double-april-30-2025.jpg',
          content: 'Voici le contenu détaillé du premier article.',
          createdAt: '2025-04-30T20:20:53Z',
        },
        {
          id: '2',
          title: 'Sheryl Crow Says an Armed Man Got On Her Property After She Ditched Her Tesla',
          description: 'Sheryl Crow said an armed intruder got onto her property after she publicly sold her Tesla in protest of Elon Musk and Donald Trump.',
          image: 'https://www.rollingstone.com/wp-content/uploads/2025/04/GettyImages-2198304896.jpg?w=1600&h=900&crop=1',
          content: 'Sheryl Crow said she caught an armed man on her property in Tennessee after publicly ditching her Tesla in protest of Elon Musk and President Donald Trump’s efforts to gut governmentprograms through … [+1767 chars',
          createdAt: '2025-04-30T20:26:25Z',
        },
      ] ,
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
