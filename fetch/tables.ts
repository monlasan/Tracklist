// Get All Project Tables
export async function getAll(url: string) {
  try {
    const data = await $fetch(url);
    return data;
  } catch (error) {
    console.error('Something happened', error);
  }
}
// Add A Table
export async function addTable(id: string, data: string) {
  try {
    await $fetch(`/api/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: id,
        name: data,
      }),
    });
  } catch (error) {
    console.error('Something happened', error);
  }
}
// Update Table
export async function updateTable(tableName: string, id: string) {
  try {
    await $fetch(`/api/tables/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newName: tableName }),
    });
  } catch (error) {
    console.error('Something happened', error);
  }
}
// Delete A Table
export async function deleteTable(id: string) {
  try {
    await $fetch(`/api/tables/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Something happened', error);
  }
}
