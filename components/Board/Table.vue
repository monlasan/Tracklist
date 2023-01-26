<script setup>
import { PlusIcon, DotsIcon, MessageIcon } from 'vue-tabler-icons';
import { onClickOutside } from '@vueuse/core';
import {
  required,
  alphaNum,
  numeric,
  helpers,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const props = defineProps({
  table: undefined,
});

// Stores
const openTicketModal = useStoreOpenNewTicketModal();

// FORM REFS
const ticketTitle = ref('');
const ticketDescription = ref('');
const ticketTeam = ref([]);
const ticketTags = ref('');
const ticketEstimatedTime = ref(0);
const ticketType = ref('');
const ticketPriority = ref('');

const ticketTagsSeparated = computed(() =>
  ticketTags.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t !== '')
);

const ticketToValidate = computed(() => {
  return {
    title: ticketTitle.value,
    description: ticketDescription.value,
    tags: ticketTagsSeparated.value,
    estimatedTime: ticketEstimatedTime.value,
    type: ticketType.value,
    priority: ticketPriority.value,
  };
});
const rules = {
  title: {
    required: helpers.withMessage('Titre: Ce champ est requis !', required),
    alphaNum: helpers.withMessage(
      'Titre: Seulement des caractères alphanumériques !',
      alphaNum
    ),
    minLength: helpers.withMessage(
      'Titre: Au moins 4 caractères !',
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      'Titre: Au plus 50 caractères !',
      maxLength(50)
    ),
  },
  description: {
    required: helpers.withMessage(
      'Description: Ce champ est requis !',
      required
    ),
    alphaNum: helpers.withMessage(
      'Description: Seulement des caractères alphanumériques !',
      alphaNum
    ),
    minLength: helpers.withMessage(
      'Description: Au moins 6 caractères !',
      minLength(6)
    ),
    maxLength: helpers.withMessage(
      'Description: Au plus 50 caractères !',
      maxLength(50)
    ),
  },
  tags: {
    required: helpers.withMessage('Tags: Ce champ est requis !', required),
    minLength: helpers.withMessage(
      'Tags: Au moins 4 caractères !',
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      'Tags: Au plus 30 caractères !',
      maxLength(30)
    ),
    alphaNum: helpers.withMessage(
      'Tags: Seulement des caractères alphanumériques !',
      alphaNum
    ),
  },
  estimatedTime: {
    required: helpers.withMessage(
      'Temps estimé: Ce champ est requis !',
      required
    ),
    numeric: helpers.withMessage(
      'Temps estimé: Seulement des chiffres !',
      numeric
    ),
  },
  type: {
    required: helpers.withMessage('Type: Ce champ est requis !', required),
  },
  priority: {
    required: helpers.withMessage('Priorité: Ce champ est requis !', required),
  },
};
const $v = useVuelidate(rules, ticketToValidate);

async function addTicket() {
  const validatedLogin = await $v.value.$validate();
  console.log(ticketToValidate.value);

  // console.log($v.value.$errors);

  // if (validatedLogin) {
  //   const ticketDataMisc = {
  //     imageUrl: null, // Add Img Url
  //     initiator: null /** Add current user ID */,
  //     table: null, // Add current table ID
  //   };
  //   console.log(ticketDataMisc);
  // }
}

// // Ticket modal
// const showModal = ref(false);
// // Click Outside the modal
// const modal = ref(null);
// onClickOutside(modal, () => (showModal.value = false));
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
      <div
        class="bg-indigo-100 border-indigo-300 text-center text-indigo-700 border border-dashed rounded-md p-8 py-4 text-xs"
      >
        Aucun ticket
      </div>
      <!-- <Ticket :title="lol" createdAt="15 Nov 2022 - 12h30" /> -->
    </ul>

    <!-- <Teleport to="#newTicketModal"> -->
    <!-- <Transition name="modal">
      <div v-if="showModal" class="flex bg-black/50 fixed inset-0">
        <div ref="modal">OKMA</div>
      </div>
    </Transition> -->
    <!-- </Teleport> -->
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
  transform: translateX(-10px);
}
</style>
