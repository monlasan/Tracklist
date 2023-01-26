<script setup>
defineProps({
  text: { type: String, default: 'Tsext' },
  type: {
    validator(value) {
      return ['red', 'orange', 'blue', 'gray'].includes(value);
    },
    required: true,
  },
});
</script>
<template>
  <div
    class="text-xs flex self-start items-center w-fit uppercase bg-indigo-200 font-medium text-indigo-500 p-1 px-2 rounded-md"
    :class="{
      'gap-1': $slots.icon,
      '!bg-red-500 !text-white': type === 'red',
      '!bg-indigo-500 !text-white': type === 'blue',
      '!bg-orange-400 !text-white': type === 'orange',
      '!bg-zinc-50 !text-zinc-500 border  !transform-none border-zinc-100 font-normal':
        type === 'gray',
    }"
  >
    <slot name="icon" />
    {{ text }}
  </div>
</template>
