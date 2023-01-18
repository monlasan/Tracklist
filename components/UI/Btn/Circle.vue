<!-- <template>
  <button
    class="w-7 h-7 rounded-full grid place-items-center bg-task-3 text-white"
  >
    <slot />
  </button>
</template> -->

<script setup>
const props = defineProps({
  bType: String,
  type: {
    validator(value) {
      return ['red', 'orange', 'blue', 'gray', 'white'].includes(value);
    },
    required: true,
  },
});
</script>
<template>
  <button
    :type="buttonType"
    class="w-7 h-7 rounded-full shadow grid place-items-center outline-none bg-task-4 hover:bg-task-5 transition-colors text-white"
    :class="{
      '!bg-red-600 hover:!bg-red-700': type === 'red',
      '!bg-indigo-600  hover:!bg-indigo-700': type === 'blue',
      '!bg-orange-400  hover:!bg-orange-700': type === 'orange',
      '!bg-white !text-zinc-600 border hover:!bg-zinc-200 hover:!text-zinc-700':
        type === 'white',
      '!bg-zinc-100 !text-zinc-600 border hover:!bg-zinc-200 hover:!text-zinc-700':
        type === 'gray',
    }"
  >
    <slot />
  </button>
</template>
