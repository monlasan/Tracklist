import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // return all projects
  const data = await prisma.project.findMany({
    include: {
      contributors: true,
    },
  });
  return data;
});
