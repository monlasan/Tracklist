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
// tableUpdateModal
const showTableUpdateModal = ref(false);
const tableUpdateModal = ref(null);
// tableDeleteModal
const showTableDeleteModal = ref(false);
const tableDeleteModal = ref(null);
function showingUpdateModal() {
  showTableUpdateModal.value = true;
  showTableActionsPopup.value = false;
}
function showingDeleteModal() {
  showTableDeleteModal.value = true;
  showTableActionsPopup.value = false;
}
onClickOutside(tableActionsPopup, () => (showTableActionsPopup.value = false));
onClickOutside(tableUpdateModal, () => (showTableUpdateModal.value = false));
onClickOutside(tableDeleteModal, () => (showTableDeleteModal.value = false));
</script>

<template>
  <div
    class="p-4 bg-task-2 th-scroll-child overflow-hidden rounded-sm min-w-[300px] self-end"
  >
    <div v-if="showTableUpdateModal" class="absolute inset-0 bg-black/50 z-10">
      <ModalUpdateTable
        ref="tableUpdateModal"
        :tableId="table.id"
        @cancelUpdate="showTableUpdateModal = false"
      />
    </div>
    <div v-if="showTableDeleteModal" class="absolute inset-0 bg-black/50 z-10">
      <ModalDeleteTable
        ref="tableDeleteModal"
        :tableId="table.id"
        @cancelDelete="showTableDeleteModal = false"
      />
    </div>
    <div class="flex justify-between">
      <pre>{{ table.id }}</pre>
      <h4 class="text-lg capitalize text-zinc-800 font-medium">
        {{ table.name }}
      </h4>

      <div class="relative" ref="tableActionsPopup">
        <UIBtnCircle
          @click="showTableActionsPopup = !showTableActionsPopup"
          type="light"
          size="28"
        >
          <dots-icon size="18" />
        </UIBtnCircle>
        <Transition name="modal">
          <div
            v-if="showTableActionsPopup"
            class="flex flex-col gap-1 absolute right-0 top-8 z-10 p-2 rounded-sm shadow-xl bg-white"
          >
            <button
              class="flex hover:bg-zinc-100 items-center gap-2 p-1 px-2 rounded-sm text-gray-600 text-xs whitespace-nowrap"
              @click="showingUpdateModal"
            >
              <edit-icon size="18" class="text-zinc-700" />
              Editer tableau
            </button>
            <button
              class="flex hover:bg-zinc-100 items-center gap-2 p-1 px-2 rounded-sm text-gray-600 text-xs whitespace-nowrap"
              @click="showingDeleteModal"
            >
              <trash-icon size="18" class="text-zinc-700" />
              Supprimer tableau
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <button
      @click="openTicketModal = true"
      class="text-sm my-3 flex items-center hover:bg-task-3 hover:border hover:border-indigo-200 hover:text-white border-task-2 border text-gray-600 gap-3 pr-3 p-1 rounded-sm"
    >
      <div class="bg-task-3 p-1 rounded-sm text-white">
        <plus-icon size="17" />
      </div>
      Ajouter un ticket
    </button>
    <ul class="flex flex-col gap-4">
      <div
        v-if="tables?.tickets.length === 0"
        class="bg-indigo-100 rounded-sm border-indigo-300 text-center text-indigo-700 border border-dashed p-8 py-4 text-xs"
      >
        Aucun ticket
      </div>
      <Ticket
        v-for="(ticket, index) in table?.tickets"
        :ticket="ticket"
        :key="table.id + index"
      />
    </ul>
  </div>
</template>
