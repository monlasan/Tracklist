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
    class="text-xs flex self-start items-center w-fit uppercase bg-indigo-100 font-medium text-indigo-600 p-1 px-2 rounded-md"
    :class="{
      'gap-1': $slots.icon,
      '!bg-red-100 !text-red-600': type === 'red',
      '!bg-indigo-100 !text-indigo-600': type === 'blue',
      '!bg-orange-400 !text-white': type === 'orange',
      '!bg-zinc-100 !text-zinc-600 border': type === 'gray',
    }"
  >
    <slot name="icon" />
    {{ text }}
  </div>
</template>
