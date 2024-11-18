import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authors: Prisma.AuthorCreateInput[] = [{
    username: 'jvm1980',
    password: '123456',
    messages: {
        create: [
            {
                content: 'Hello Hello message 1',
            },
            {
                content: 'Hello Hello message 1',
            }
        ]
    }
},
{
    username: 'rodrigo',
    password: '123456',
    messages: {
        create: [
            {
                content: 'Hallo mein name ist Rodrigo',
            },
            {
                content: 'Was geht ?',
            }
        ]
    }
}

];

async function main() {
    await prisma.message.deleteMany()
    await prisma.author.deleteMany()

    for (const author of authors) {
        await prisma.author.create({
            data: author
        });
        console.log('Author Created: ', author.username);
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