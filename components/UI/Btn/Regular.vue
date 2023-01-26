<script setup>
const props = defineProps({
  text: String,
  bType: String,
  full: Boolean,
  type: {
    validator(value) {
      return ['red', 'orange', 'blue', 'gray'].includes(value);
    },
  },
});
</script>
<template>
  <button
    :type="bType"
    class="self-start p-2 gap-2 outline-none text-sm flex justify-center items-center text-white rounded-md bg-task-4 hover:bg-task-5 transition-colors"
    :class="{
      'gap-2': $slots.iconRight,
      'gap-2': $slots.iconLeft,
      'w-full': full,
      '!bg-red-600 hover:!bg-red-700': type === 'red',
      '!bg-indigo-600  hover:!bg-indigo-700': type === 'blue',
      '!bg-orange-400  hover:!bg-orange-700': type === 'orange',
      '!bg-zinc-100 !text-zinc-600 border hover:!bg-zinc-200 hover:!text-zinc-700 ':
        type === 'gray',
    }"
  >
    <slot name="iconLeft" />
    {{ text }}
    <slot name="iconRight" />
  </button>
</template>
