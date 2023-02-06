<script setup>
import { MessageIcon } from 'vue-tabler-icons';
const props = defineProps({
  ticket: null,
});
</script>
<template>
  <li class="cursor-pointer transition-all py-3 bg-white rounded-sm shadow">
    <div class="flex px-3 justify-between items-center">
      <UIBadge :text="ticket.type" />

      <div class="flex items-center text-sm gap-1 text-indigo-500">
        <message-icon size="20" />
        {{ ticket.comments.length }}
      </div>
    </div>
    <h4 class="mt-4 px-3 text-sm font-medium">
      {{ ticket.title }}
    </h4>
    <!-- <img
      src="../assets/images/itachi.jpg"
      class="mt-4 aspect-video w-full object-cover"
      alt=""
    /> -->
    <!-- <pre class="mt-4 px-3 text-xs text-zinc-700">
      {{ ticket }}
    </pre> -->
    <p class="mt-4 px-3 text-xs text-zinc-700">
      {{ ticket.description }}
    </p>
    <pre class="mt-4 px-3 text-xs text-zinc-700">
      {{ ticket }}
    </pre>

    <ul class="flex mt-4 px-3 flex-wrap gap-1">
      <UIBtnTicketType :text="ticket.priority" type="red" />
      <UIBadge
        v-for="(tag, idx) in ticket.tags.split(',')"
        :key="tag + idx"
        :text="tag"
        type="gray"
      />
    </ul>
    <div class="flex items-center px-3 justify-between mt-4">
      <UIAvatarStack />
      <small class="text-xs text-zinc-600">{{ createdAt }}</small>
    </div>
  </li>
</template>
