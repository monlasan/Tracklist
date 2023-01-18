<script setup>
const query = ref('');
const filteredUsers = ref([]);
const {
  data: users,
  pending,
  refresh,
} = await useFetch('http://localhost:3004/people');
watch(users, () => {
  console.log('lol');
});
watch(query, () => {
  const ol = users.value.filter((user) =>
    user.first_name.includes(query.value)
  );
  filteredUsers.value = ol;
});
</script>
<template>
  <div class="mx-10 mt-20">
    <Head>
      <title>Home page</title>
    </Head>
    <!-- you will need to handle a loading state -->
    <!-- <div v-if="pending">Loading ...</div> -->
    <!-- <div v-else> -->
    {{ query }}
    <input v-model="query" type="text" class="border shadow p-2" />
    <div class="border border-indigo-800 p-2">
      <ol v-for="filtered in filteredUsers">
        {{
          filtered.first_name
        }}
      </ol>
    </div>
    <UIBtnRegular text="refresh" @click="refresh" />
    <div v-for="user in users">
      <b>{{ user.first_name }}</b>
    </div>
    <!-- </div> -->
  </div>
</template>
