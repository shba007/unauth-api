import prisma from '../server/utils/prisma'

async function main() {
  // Example: Create a user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })

  console.log('Seeded user:', user)
}

try {
  await main()
} catch (error_) {
  console.error(error_)
  throw error_
} finally {
  await prisma.$disconnect()
}
