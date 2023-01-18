<script setup>
import { MessageIcon } from 'vue-tabler-icons';
const props = defineProps({
  title: String,
  createdAt: String,
});
</script>
<template>
  <li
    class="p-3 cursor-pointer hover:scale-[102%] hover:border-task-3 border-t-2 border-white transition-all bg-white rounded shadow"
  >
    <div class="flex justify-between items-center">
      <UIBadge text="Urgent" type="blue" />
      <UIBadge text="2" type="orange" v-slot:icon>
        <message-icon size="20" />
      </UIBadge>
    </div>
    <h4 class="mt-4 text-sm font-medium">{{ title }}</h4>
    <!-- <img
      src="../assets/images/example-image-ticket.PNG"
      class="mt-4 rounded-md aspect-video w-full object-cover"
      alt=""
    /> -->
    <p class="mt-2 text-xs text-zinc-700">{{ title }}</p>
    <ul class="flex mt-4 flex-wrap gap-1">
      <UIBadge text="Urgent yes" type="gray" />
    </ul>
    <div class="flex items-center justify-between mt-4">
      <UIAvatarStack />
      <small class="text-xs">{{ createdAt }}</small>
    </div>
  </li>
</template>
