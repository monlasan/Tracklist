<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  label: {
    type: [String, Boolean],
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
defineEmits(['update:modelValue']);
</script>
<template>
  <label :for="name" class="text-xs font-medium">
    <span class="inline-block mb-1 text-indigo-800" v-if="label">{{
      label
    }}</span>
    <input
      type="text"
      :id="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="outline-indigo-200 bg-zinc-50 p-1 px-2 text-base border w-full shadow-sm rounded-md"
    />
  </label>
</template>
