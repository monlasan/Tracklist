import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // create new member (user)
  const data = await prisma.member.create({
    data: {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    },
  });
  return data;
});
