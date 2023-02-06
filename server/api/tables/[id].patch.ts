import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const tableId = event.context.params.id;
  const body = await readBody(event);

  // delete [id] table
  const data = await prisma.table.update({
    where: {
      id: tableId,
    },
    data: {
      name: body.newName,
    },
  });
  return data;
});
