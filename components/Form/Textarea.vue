<script setup>
const props = defineProps({
  tall: {
    type: String,
    default: '',
  },
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
    <textarea
      :id="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :style="[tall ? 'height:' + tall + 'px' : null]"
      class="outline-indigo-200 p-1 bg-zinc-100 px-2 text-base border w-full shadow-sm rounded-sm"
    >
    </textarea>
  </label>
</template>
