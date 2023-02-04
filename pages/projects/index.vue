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
      <h2 class="text-2xl font-semibold">Projets</h2>
      <nuxt-link to="/projects/1">A project</nuxt-link>

      <button
        class="rounded-md p-2 font-medium px-3 text-sm text-indigo-700 bg-white flex items-center gap-2"
      >
        Nouveau projet
        <plus-icon size="20" />
      </button>
    </header>
    <TableDataProject :projects="projects" />
  </NuxtLayout>
</template>
