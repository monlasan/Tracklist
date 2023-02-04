<script setup>
import { PlusIcon } from 'vue-tabler-icons';
import { getAll } from '~~/fetch/projects';
import useSWRV from 'swrv';
const { data: projects } = useSWRV('/api/projects', getAll);
</script>
<template>
  <NuxtLayout>
    <header
      class="flex p-9 py-4 bg-task-4 text-white justify-between items-center"
    >
      <h2 class="text-2xl font-semibold">Dashboard</h2>

      <button
        class="rounded-md p-2 font-medium px-3 text-sm text-indigo-700 bg-white flex items-center gap-2"
      >
        Nouveau projet
        <plus-icon size="20" />
      </button>
    </header>
    <p v-for="(project, index) in projects" :key="index">
      {{ project.name }}
    </p>
  </NuxtLayout>
</template>
