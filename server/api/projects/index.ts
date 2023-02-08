import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  // return all projects
  try {
    const data = await prisma.project.findMany({
      include: {
        contributors: true,
      },
    });
    return data;
  } catch (err) {
    console.log('Something went wrong while fetching the data');
  }
});
