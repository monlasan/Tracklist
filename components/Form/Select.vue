<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
  name: {
    type: String,
    default: '',
    required: true,
  },
  label: {
    type: [String, Boolean],
    default: '',
  },
  modelValue: {
    required: true,
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

    <select
      :id="name"
      id="ticket_type"
      class="outline-indigo-200 bg-zinc-50 p-1 px-2 text-base border w-full shadow-sm rounded-sm"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="(item, index) in items" :key="index">{{ item }}</option>
    </select>
  </label>
</template>
