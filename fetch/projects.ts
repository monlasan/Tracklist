import { GitPullRequestClosedIcon } from 'vue-tabler-icons';

// Get All Projects
export async function getAll() {
  try {
    const data = await $fetch('/api/projects');
    return data;
  } catch (error) {
    console.error('Something happened', error);
  }
}
