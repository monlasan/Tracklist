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
  value: {
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

// wata;
</script>
<template>
  <div>
    <label :for="name" class="border p-2 rounded-md h-10">Manitou</label>
    <input
      @change="$emit('update:modelValue')"
      :value="value"
      type="checkbox"
      :name="name"
      :id="name"
    />
    <!-- {{ modelValue }} -->
  </div>
</template>
