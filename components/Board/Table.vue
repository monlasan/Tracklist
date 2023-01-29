<script setup>
import { onClickOutside } from '@vueuse/core';
import { PlusIcon, DotsIcon, TrashIcon, EditIcon } from 'vue-tabler-icons';

const props = defineProps({
  table: undefined,
});

// Stores
const openTicketModal = useStoreOpenNewTicketModal();

// tableActionsPopup
const showTableActionsPopup = ref(false);
const tableActionsPopup = ref(null);
// tableActionsModal
const showTableActionsModal = ref(false);
const tableActionsModal = ref(null);
function showingUpdateModal() {
  showTableActionsModal.value = true;
  showTableActionsPopup.value = false;
}
onClickOutside(tableActionsPopup, () => (showTableActionsPopup.value = false));
onClickOutside(tableActionsModal, () => (showTableActionsModal.value = false));
</script>

<template>
  <!-- {{ table.id }} -->
  <div
    class="p-4 bg-task-2 th-scroll-child overflow-hidden min-w-[300px] rounded-md self-end"
  >
    <!-- {{ table.id }} -->

    <!-- <div ref="tableActionsModal"> -->
    <div v-if="showTableActionsModal" class="absolute inset-0 bg-black/50 z-10">
      <ModalUpdateTable ref="tableActionsModal" :tableId="table.id" />
    </div>
    <div class="flex justify-between">
      <h4 class="text-lg text-zinc-800 font-medium">{{ table.name }}</h4>

      <div class="relative" ref="tableActionsPopup">
        <UIBtnCircle
          @click="showTableActionsPopup = !showTableActionsPopup"
          type="light"
          size="28"
        >
          <dots-icon size="18" />
        </UIBtnCircle>
        <div
          v-if="showTableActionsPopup"
          class="flex flex-col gap-1 absolute right-0 top-8 z-10 p-2 rounded-md shadow-xl bg-white"
        >
          <button
            class="flex hover:bg-zinc-100 items-center gap-2 p-1 px-2 rounded-md text-gray-600 text-xs whitespace-nowrap"
            @click="showingUpdateModal"
          >
            <edit-icon size="18" class="text-zinc-700" />
            Editer tableau
          </button>
          <button
            class="flex hover:bg-zinc-100 items-center gap-2 p-1 px-2 rounded-md text-gray-600 text-xs whitespace-nowrap"
          >
            <trash-icon size="18" class="text-zinc-700" />
            Supprimer tableau
          </button>
        </div>
      </div>
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
      <div
        class="bg-indigo-100 border-indigo-300 text-center text-indigo-700 border border-dashed rounded-md p-8 py-4 text-xs"
      >
        Aucun ticket
      </div>
      <!-- <Ticket createdAt="15 Nov 2022 - 12h30" /> -->
    </ul>
  </div>
</template>
