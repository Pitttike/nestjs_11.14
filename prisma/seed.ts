import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
import { connect } from 'http2';
const prisma = new PrismaClient()
async function main() {
  for (let i = 0; i < 15; i++) {
    await prisma.artist.create({
      data: {
        name: faker.music.artist(),
        birthDate: faker.date.birthdate() 
      }
    })
  }

  for (let i = 0; i < 50; i++) {
    await prisma.song.create({
      data: {
        author: 'Artist ' + i,
        title: 'Song' + i,
        Length: Math.floor(Math.random() * 60) + 60,
        Price: Math.floor(Math.random() * 300) + 99,
        rate: Math.floor(Math.random() * 10) + 1,
        artist: { connect: { id: 1 } }
      }
    })
  }
  for (let i = 0; i < 10; i++) {
    await prisma.playlist.create({
      data: {
        name: faker.music.album(),
        songs: {
          connect: {
            id: i + 1
          }
        }
      }
    })
  }
 
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
