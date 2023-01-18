<script setup>
const props = defineProps({
  to: String,
  text: String,
});
</script>
<template>
  <NuxtLink :to="text" class="flex group flex-col capitalize items-center"
    ><div
      class="w-12 h-12 grid place-items-center group-hover:text-task-3 transition-colors duration-100 rounded-full group-hover:shadow-sm group-hover:bg-task-1"
    >
      <slot />
    </div>
    {{ text }}</NuxtLink
  >
</template>
