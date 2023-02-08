// Get All members
export async function getAll() {
  try {
    const data = await $fetch('/api/members');
    return data;
  } catch (error) {
    console.error('Something happened', error);
  }
}
// Get [id] Member
export async function getMember(url: string) {
  try {
    const data = await $fetch(url);
    return data;
  } catch (error) {
    console.error('Something happened', error);
  }
}
