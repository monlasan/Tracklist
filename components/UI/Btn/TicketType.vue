<script setup>
defineProps({
  text: { type: String, default: 'Tsext' },
  type: {
    validator(value) {
      return ['red', 'orange', 'blue', 'gray'].includes(value);
    },
  },
});
</script>
<template>
  <div
    class="text-xs flex self-start border border-dashed items-center w-fit uppercase bg-indigo-200 font-medium text-indigo-500 p-1 px-2 rounded-md"
    :class="{
      'gap-1': $slots.icon,
      '!bg-red-50 border-red-400 !text-red-400': type === 'red',
      '!bg-indigo-50 border-indigo-400 ': type === 'blue',
      '!bg-orange-50 border-orange-400 !text-orange-400': type === 'orange',
      '!bg-zinc-50 !text-zinc-500 border-zinc-400 !transform-none font-normal':
        type === 'gray',
    }"
  >
    <slot name="icon" />
    {{ text }}
  </div>
</template>
