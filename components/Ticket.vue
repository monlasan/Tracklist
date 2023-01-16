<script setup>
import { MessageIcon } from 'vue-tabler-icons';
const props = defineProps({
  title: String,
  createdAt: String,
});
</script>
<template>
  <li
    class="p-3 cursor-pointer hover:scale-[102%] hover:border-task-3/50 border-2 border-white transition-all bg-white rounded-md shadow shadow-indigo-100"
  >
    <div class="flex justify-between items-center">
      <UIBadge text="Urgent" type="blue" />
      <UIBadge text="2" type="orange" v-slot:icon>
        <message-icon size="20" />
      </UIBadge>
    </div>
    <p class="mt-4">{{ title }}</p>

    <ul class="flex mt-4 flex-wrap gap-1">
      <UIBadge text="Urgent yes" type="gray" />
    </ul>
    <div class="flex items-center justify-between mt-4">
      <UIAvatarStack />
      <small class="text-xs">{{ createdAt }}</small>
    </div>
  </li>
</template>
