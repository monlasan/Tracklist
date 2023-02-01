<script setup>
const props = defineProps({
  to: String,
  text: String,
});
const route = useRoute();
</script>
<template>
  <NuxtLink
    :to="'/' + to.toLowerCase()"
    class="flex group flex-col capitalize items-center"
    ><div
      :class="{
        'text-task-3 bg-task-1': route.path.includes(to) ? true : false,
      }"
      class="w-12 h-12 grid place-items-center group-hover:text-task-3 transition-colors duration-100 rounded-full group-hover:shadow-sm group-hover:bg-task-1"
    >
      <slot />
    </div>
    {{ text }}</NuxtLink
  >
</template>
