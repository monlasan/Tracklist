import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const memberId = event.context.params.id;

  try {
    const data = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
});
