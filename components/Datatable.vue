<script setup>
import { ArrowsMoveVerticalIcon } from 'vue-tabler-icons';

const data = ref([
  {
    id: 1,
    firstName: 'Kyle',
    lastName: 'Exzee',
    age: 29,
    sex: 'M',
  },
  {
    id: 2,
    firstName: 'Sally',
    lastName: 'Park',
    age: 17,
    sex: 'F',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Wick',
    age: 31,
    sex: 'M',
  },
  {
    id: 4,
    firstName: 'Pamela',
    lastName: 'Anderson',
    age: 54,
    sex: 'F',
  },
]);
const sort = ref('ln');
const sortedBy = computed(() => {
  if (sort.value === '') {
    return data;
  }
  if (sort.value === 'ln') {
    return data.value.sort((a, b) => (a.lastName - b.lastName ? 1 : -1));
  }
  if (sort.value === 'fn') {
    return data.value.sort((a, b) => (a.firstName - b.firstName ? 1 : -1));
  }
  if (sort.value === 'age') {
    return data.value.sort((a, b) => a.age - b.age);
  }
  if (sort.value === 'sex') {
    return data.value.sort((a, b) => (a.sex - b.sex ? 1 : -1));
  }
  // });
});
</script>
<template>
  <table class="text-left">
    {{
      sort
    }}

    <thead>
      <tr class="border bg-zinc-200">
        <th class="p-2">
          Nom
          <div @click="sort = 'ln'">Nom</div>
        </th>
        <th class="p-2">
          Prénom
          <div @click="sort = 'fn'">Prénom</div>
        </th>
        <th class="p-2">
          Age
          <div @click="sort = 'age'">Age</div>
        </th>
        <th class="p-2">
          <div @click="sort = 'sex'">Sexe</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- {{
        sortedBy
      }} -->
      <tr v-for="row in sortedBy" :key="row.firstName">
        <th class="p-2 border-b">{{ row.firstName }}</th>
        <th class="p-2 border-b">{{ row.lastName }}</th>
        <th class="p-2 border-b">{{ row.age }}</th>
        <th class="p-2 border-b">{{ row.sex }}</th>
      </tr>
    </tbody>
  </table>
</template>
