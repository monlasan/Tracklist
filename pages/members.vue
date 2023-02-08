<script setup>
import { PlusIcon } from 'vue-tabler-icons';
</script>
<template>
  <NuxtLayout>
    <Head>
      <title>Membres - Tracklist</title>
    </Head>
    <header
      class="flex p-9 py-4 bg-task-4 text-white justify-between items-center"
    >
      <h2 class="text-2xl font-semibold">Members</h2>

      <button
        class="rounded-md p-2 font-medium px-3 text-sm text-indigo-700 bg-white flex items-center gap-2"
      >
        Nouveau projet
        <plus-icon size="20" />
      </button>
    </header>
  </NuxtLayout>
</template>
