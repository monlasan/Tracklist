<template>
  <div v-if="showModal" class="flex bg-black/50 fixed inset-0">
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
            @click="showModal = false"
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
            @click="showModal = false"
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
