import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  // return all projects
  const data = await prisma.project.findMany({
    include: {
      contributors: true,
    },
  });
  return data;
});
