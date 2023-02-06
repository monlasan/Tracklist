import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const projectId = event.context.params.id;
  // return all tables for a project w/ tickets
  const data = await prisma.table.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      tickets: {
        include: {
          comments: true,
        },
      },
    },
  });
  return data;
});
