import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
      //creating two dummy articles
      const post1 = await prisma.article.upsert({
            where: { title: 'This blog is built on nestjs' },
            update: {},
            create: {
                  title: 'This blog is built on nestjs',
                  body: 'This blog is built on top of the highly performant javascript framework, which its adoption is increasing exponentially in recent times...',
                  description: 'We are excited to share that the first version for the blog project will be released soonest',
                  published: false
            }
      })

      const post2 = await prisma.article.upsert({
            where: { title: 'Features to anticipate' },
            update: {},
            create: {
                  title: 'Features to anticipate',
                  body: 'Our brilliant engineers have been working tirelessly to ensure that y\'all our users have a smooth experience and also provide more features that will be problem solvin',
                  description: 'We are excited to share that the first version for the blog project will be released soonest',
                  published: true
            }
      })
      console.log({post1, post2})
}

main()
      .catch(e => {
            console.error(e)
            process.exit(1)
      })
      .finally(async() => {
            await prisma.$disconnect()
      })