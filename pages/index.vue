<script setup>
import { useDebounceFn } from '@vueuse/core';
const query = ref('');
const isLoading = ref(null);
const filteredUsers = ref([]);

let timeoutId;

// Ecouteur d'evenement
watch(query, async () => {
  isLoading = true;
  clearTimeout(timeoutId);
  filteredUsers.value = [];
  timeoutId = setTimeout(async () => {
    if (query.value.length > 0) {
      console.log(query.value);
      const { data: users } = await useFetch('http://localhost:3004/people');
      const iuser = JSON.stringify(users.value);
      const arrUser = JSON.parse(iuser);
      filteredUsers.value = arrUser.filter((user) =>
        user.first_name.toLowerCase().includes(query.value.toLowerCase())
      );
      isLoading = false;
    }
  }, 1000);
});
</script>
<template>
  <div class="mx-10 mt-20">
    <Head>
      <title>Home page</title>
    </Head>
    {{ query }}
    <input v-model="query" type="text" class="border shadow p-2" />
    <div class="border border-zinc-400 border-dashed p-2 py-4 my-8 rounded-md">
      <ol v-for="filtered in filteredUsers">
        {{
          filtered.first_name
        }}
      </ol>
    </div>
  </div>
</template>
