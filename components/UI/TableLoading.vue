<script setup>
import { LoaderIcon } from 'vue-tabler-icons';
</script>
<template>
  <div
    class="flex items-center gap-2 justify-center th-scroll-child text-sm p-4 rounded-md self-end border border-indigo-300 border-dashed text-indigo-800 bg-indigo-200/50"
  >
    <loader-icon size="20" class="animate-spin duration-200" />
    <span> Chargement des tickets... </span>
  </div>
</template>
