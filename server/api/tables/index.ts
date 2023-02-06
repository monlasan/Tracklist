import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  return 'Hello on tables';
});
