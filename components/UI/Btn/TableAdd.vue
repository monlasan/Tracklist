<script setup>
import { PlusIcon } from 'vue-tabler-icons';
</script>
<template>
  <button
    class="flex items-center justify-center shadow-sm outline-none hover:border-task-3/50 border-2 border-task-2 transition-all self-end gap-3 p-3 px-5 text-indigo-800 rounded-sm bg-task-2"
  >
    <div
      class="w-7 h-7 rounded-full shadow-indigo-900/10 text-indigo-500 bg-white grid place-items-center"
    >
      <plus-icon size="19" />
    </div>
    <span class="whitespace-nowrap">Ajouter un tableau</span>
  </button>
</template>
