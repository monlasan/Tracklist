<script setup>
const props = defineProps({
  size: String,
  bType: String,
  type: {
    validator(value) {
      return ['red', 'orange', 'blue', 'gray', 'white', 'light'].includes(
        value
      );
    },
  },
});
</script>
<template>
  <button
    :type="bType"
    class="rounded-full aspect-square shadow grid place-items-center outline-none bg-task-4 hover:bg-task-5 transition-colors text-white"
    :style="'width: ' + size + 'px'"
    :class="[
      {
        '!bg-red-600 hover:!bg-red-700': type === 'red',
        '!bg-indigo-600  hover:!bg-indigo-700': type === 'blue',
        '!bg-orange-400  hover:!bg-orange-700': type === 'orange',
        '!bg-white !text-zinc-600 border hover:!bg-zinc-200 hover:!text-zinc-700':
          type === 'white',
        '!bg-transparent !text-zinc-600 !shadow-none  hover:!bg-white hover:!text-zinc-500':
          type === 'light',
        '!bg-zinc-100 !text-zinc-600 border hover:!bg-zinc-200 hover:!text-zinc-700':
          type === 'gray',
      },
    ]"
  >
    <slot />
  </button>
</template>
