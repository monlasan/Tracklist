<script setup>
import { PlusIcon, DotsIcon, MessageIcon } from 'vue-tabler-icons';
import { onClickOutside } from '@vueuse/core';
const props = defineProps({
  name: String,
  tickets: null,
});

// FORM REFS
const ticketTitle = ref('');
const ticketDescription = ref('');
const ticketEstimatedTime = ref(0);
const ticketType = ref('');
const ticketPriority = ref('');

const tables = useTables();

function addTicket() {
  const ticket = {
    title: ticketTitle.value,
    description: ticketDescription.value,
    estimatedTime: ticketEstimatedTime.value,
    type: ticketType.value,
    priority: ticketPriority.value,
  };
  console.log(ticket);
}
// Ticket modal
const showModal = ref(false);
// Click Outside the modal
const modal = ref(null);
onClickOutside(modal, () => (showModal.value = false));
</script>
<template>
  <div class="p-4 bg-task-2 th-scroll-child min-w-[300px] rounded-md self-end">
    <div class="flex justify-between">
      <h4 class="text-lg text-zinc-800 font-medium">{{ name }}</h4>
      <UIBtnCircle> <dots-icon size="20" /> </UIBtnCircle>
    </div>
    <ul class="flex flex-col my-4 gap-4">
      <Ticket
        v-for="ticket in tickets"
        :title="ticket.t"
        createdAt="15 Nov 2022 - 12h30"
      />
    </ul>
    <UIBtnRegular
      @click="showModal = true"
      text="Ajouter un ticket"
      full
      type="zinc"
      v-slot:iconLeft
    >
      <plus-icon size="20" />
    </UIBtnRegular>
    <Teleport to="#newTicketModal">
      <Transition name="modal">
        <div
          v-if="showModal"
          class="flex justify-center items-start pt-10 bg-black/50 px-8 fixed inset-0"
        >
          <div
            ref="modal"
            class="px-6 pb-6 rounded-md overflow-hidden bg-white w-full max-w-xl shadow-md"
          >
            <header
              class="flex py-4 px-6 -mx-6 mb-6 bg-task-4 text-white items-center border-b justify-between"
            >
              <span class="font-medium text-xl">Ajouter un ticket</span>
              <UIBtnCircle
                type="white"
                @click="showModal = false"
                class="rotate-45"
                ><plus-icon size="20"
              /></UIBtnCircle>
            </header>
            <form @submit.prevent="addTicket" class="flex flex-col gap-4">
              <label for="ticket_title" class="text-xs font-medium">
                <span class="inline-block mb-1">Titre</span>
                <input
                  type="text"
                  id="ticket_title"
                  class="outline-indigo-200 p-1 px-2 text-base border flex-1 w-full shadow rounded-md"
                  v-model="ticketTitle"
                />
              </label>
              <label for="ticket_description" class="text-xs font-medium">
                <span class="inline-block mb-1">Description</span>
                <textarea
                  id="ticket_description"
                  class="outline-indigo-200 p-1 px-2 text-base border flex-1 w-full shadow rounded-md"
                  v-model="ticketDescription"
                ></textarea>
              </label>
              <FormAddMember />
              <div class="flex gap-3 flex-col sm:flex-row">
                <label for="ticket_estimate_time" class="text-xs font-medium">
                  <span class="inline-block mb-1">Temps estimé (heures)</span>
                  <input
                    type="number"
                    id="ticket_estimate_time"
                    class="outline-indigo-200 p-2 px-2 text-sm border flex-1 w-full shadow rounded-md"
                    v-model="ticketEstimatedTime"
                  />
                </label>
                <label for="ticket_type" class="text-xs font-medium">
                  <span class="inline-block mb-1">Type</span>
                  <select
                    id="ticket_type"
                    class="outline-indigo-200 p-2 text-sm border flex-1 w-full shadow rounded-md"
                    v-model="ticketType"
                  >
                    <option>Volvo XC90</option>
                  </select>
                </label>
                <label for="ticket_priority" class="text-xs font-medium">
                  <span class="inline-block mb-1">Priorité</span>
                  <select
                    id="ticket_priority"
                    class="outline-indigo-200 p-2 text-sm border flex-1 w-full shadow rounded-md"
                    v-model="ticketPriority"
                  >
                    <option>Volvo XC90</option>
                  </select>
                </label>
              </div>
              <UIBtnRegular
                bType="submit"
                text="Créer"
                class="px-4 mt-3"
                full
              />
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
