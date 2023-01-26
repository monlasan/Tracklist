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
    tags: ticketTags.value,
    estimatedTime: ticketEstimatedTime.value,
    type: ticketType.value,
    priority: ticketPriority.value,
  };
});

const rules = {
  title: {
    required: helpers.withMessage('Titre: Ce champ est requis !', required),
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
    minLength: helpers.withMessage(
      'Description: Au moins 6 caractères !',
      minLength(6)
    ),
  },
  tags: {
    required: helpers.withMessage('Tags: Ce champ est requis !', required),
    minLength: helpers.withMessage(
      'Tags: Au moins 4 caractères !',
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      'Tags: Au plus 100 caractères !',
      maxLength(100)
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

  /**
   * TODO: Complete logic to add new ticket to database and the "view"
   */
  if (validatedLogin) {
    console.log({
      ...ticketToValidate.value,
      tags: ticketTagsSeparated.value,
      imageUrl: null,
      initiator: null,
      table: null,
    });
  }
}

// Click Outside the modal
const modal = ref(null);
onClickOutside(modal, () => (openTicketModal.value = false));
</script>
<template>
  <div v-if="openTicketModal" class="flex bg-black/50 fixed inset-0">
    <div
      ref="modal"
      class="overflow-hidden px-6 flex flex-col bg-white w-full md:max-w-lg shadow-md"
    >
      <header
        class="flex py-4 px-6 bg-zinc-50 border-b -mx-6 mb-8 items-center justify-between"
      >
        <span class="">Ajouter un ticket</span>
        <button class="group">
          <plus-icon
            class="rotate-45 group-hover:text-zinc-700 text-zinc-600 transition-colors"
            @click="openTicketModal = false"
            size="28"
          />
        </button>
      </header>
      <form
        @submit.prevent="addTicket"
        class="flex flex-1 flex-col relative overflow-hidden pb-20 gap-4"
      >
        <ul class="list-disc list-inside pl-2">
          <li
            :key="addtableinputError.$uid"
            v-for="addtableinputError in $v.$errors"
            class="text-xs text-red-600 font-medium"
          >
            {{ addtableinputError.$message }}
          </li>
        </ul>
        <div class="flex flex-col gap-4 overflow-y-auto">
          <FormInputBase
            label="Titre"
            name="ticketTitle"
            v-model="ticketTitle"
          />

          <FormTextarea
            tall="120"
            label="Description"
            name="ticketDescription"
            v-model="ticketDescription"
          />
          <FormAddMember v-model="ticketTeam" />
          <FormInputBase
            type="text"
            label="Tags (séparé par des virgules)"
            name="ticketTags"
            v-model="ticketTags"
          />
          <div class="flex gap-3 flex-col sm:flex-row">
            <FormInputBase
              type="number"
              min="0"
              label="Temps estimé (heures)"
              name="ticketEstimatedTime"
              v-model="ticketEstimatedTime"
            />
            <FormSelect
              label="Type"
              name="ticketType"
              v-model="ticketType"
              :items="['Misc', 'degen']"
            />
            <FormSelect
              label="Priorité"
              name="ticketPriority"
              v-model="ticketPriority"
              :items="['Urgent', 'morka']"
            />
          </div>
        </div>
        <div
          class="mt-auto flex gap-4 py-4 bg-white border-t absolute bottom-0 left-0 right-0"
        >
          <UIBtnRegular
            @click="openTicketModal = false"
            type="gray"
            text="Annuler"
            full
          />
          <UIBtnRegular bType="submit" text="Créer" full />
        </div>
      </form>
    </div>
  </div>
</template>
