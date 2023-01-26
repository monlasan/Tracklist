<script setup>
import { PlusIcon, DotsIcon } from 'vue-tabler-icons';

const props = defineProps({
  table: undefined,
});

// Stores
const openTicketModal = useStoreOpenNewTicketModal();
</script>

<template>
  <div class="p-4 bg-task-2 th-scroll-child min-w-[300px] rounded-md self-end">
    <div class="flex justify-between">
      <h4 class="text-lg text-zinc-800 font-medium">{{ table.name }}</h4>
      <UIBtnCircle type="light" size="28">
        <dots-icon size="18" />
      </UIBtnCircle>
    </div>

    <button
      @click="openTicketModal = true"
      class="text-sm my-3 flex items-center hover:bg-task-3 hover:border hover:border-indigo-200 hover:text-white border-task-2 border text-gray-600 gap-3 pr-3 p-1 rounded-md"
    >
      <div class="bg-task-3 p-1 rounded-md text-white">
        <plus-icon size="17" />
      </div>
      Ajouter un ticket
    </button>
    <ul class="flex flex-col gap-4">
      <!-- <div
        class="bg-indigo-100 border-indigo-300 text-center text-indigo-700 border border-dashed rounded-md p-8 py-4 text-xs"
      >
        Aucun ticket
      </div> -->
      <Ticket :title="lol" createdAt="15 Nov 2022 - 12h30" />
    </ul>
  </div>
</template>
