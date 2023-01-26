<script setup>
import { MessageIcon } from 'vue-tabler-icons';
const props = defineProps({
  title: String,
  createdAt: String,
});
</script>
<template>
  <li class="cursor-pointer transition-all py-3 bg-white rounded shadow">
    <div class="flex px-3 justify-between items-center">
      <UIBadge text="In review" />

      <div class="flex items-center text-sm gap-1 text-indigo-500">
        <message-icon size="20" />
        2
      </div>
    </div>
    <h4 class="mt-4 px-3 text-sm font-medium">
      Lorem ipsum dolor sit amet consectetur
    </h4>
    <!-- <img
      src="../assets/images/itachi.jpg"
      class="mt-4 aspect-video w-full object-cover"
      alt=""
    /> -->
    <p class="mt-4 px-3 text-xs text-zinc-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quod
      architecto voluptas temporibus asperiores.
    </p>

    <ul class="flex mt-4 px-3 flex-wrap gap-1">
      <UIBtnTicketType text="Urgent" type="red" />
      <UIBadge text="Urgent yes" type="gray" />
    </ul>
    <div class="flex items-center px-3 justify-between mt-4">
      <UIAvatarStack />
      <small class="text-xs text-zinc-600">{{ createdAt }}</small>
    </div>
  </li>
</template>
