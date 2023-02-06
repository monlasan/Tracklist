import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const tableId = event.context.params.id;
  // delete [id] table
  const data = await prisma.table.delete({
    where: {
      id: tableId,
    },
  });
  return data;
});
