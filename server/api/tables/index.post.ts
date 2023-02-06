import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // create new table
  const data = await prisma.table.create({
    data: {
      name: body.name,
      project: {
        connect: {
          id: body.projectId,
        },
      },
    },
  });
  return data;
});
