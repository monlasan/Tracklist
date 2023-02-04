<script setup>
import {
  KeyIcon,
  TrashIcon,
  EyeIcon,
  EditIcon,
  LetterNIcon,
  UsersIcon,
  CalendarIcon,
  SearchIcon,
} from 'vue-tabler-icons';

const search = ref('');

const props = defineProps({
  projects: null,
});

const headers = [
  { text: 'id', value: 'id', sortable: true },
  { text: 'nom', value: 'name' },
  { text: 'contributeurs', value: 'contributors' },
  { text: 'créer le', value: 'createdAt', sortable: true },
  { text: 'modifié le', value: 'updatedAt', sortable: true },
  { text: 'Actions', value: 'actions' },
];

// const items = [
//   {
//     id: '1',
//     name: 'Promox',
//     contributors: 30,
//     createdAt: '2023-01-30T06:49:07.429Z',
//     updatedAt: '2023-01-30T06:59:07.429Z',
//   },
// ];

const showDetails = (id) => {
  navigateTo('/projects/' + id);
};
const editProject = () => {};
const deleteProject = () => {};
</script>
<template>
  <ClientOnly>
    <div class="bg-white flex items-center px-2">
      <i class="w-10 h-10 grid place-items-center text-zinc-600">
        <search-icon size="20" />
      </i>
      <input
        placeholder="Rechercher un projet..."
        v-model="search"
        type="search"
        name="search"
        id="search"
        class="w-full h-full pl-2 py-2 outline-none"
      />
    </div>

    <EasyDataTable
      :search-value="search"
      rows-per-page-message="Lignes par message"
      empty-message="Aucun projet trouvé"
      theme-color="#1230e3"
      table-class-name="eztble"
      body-row-class-name="eztbleRow"
      :headers="headers"
      :items="projects"
    >
      <template #header-id="header">
        <div class="custom-header">
          <key-icon size="18" />
          {{ header.text }}
        </div>
      </template>
      <template #item-id="{ id }">
        <div
          class="limitedLinesOne overflow-hidden w-24 p-1 px-2 rounded-full bg-task-2 text-indigo-500"
        >
          {{ id }}
        </div>
      </template>
      <template #header-name="header">
        <div class="custom-header">
          <letter-n-icon size="18" />
          {{ header.text }}
        </div>
      </template>
      <template #header-contributors="header">
        <div class="custom-header">
          <users-icon size="18" />
          {{ header.text }}
        </div>
      </template>
      <template #header-createdAt="header">
        <div class="custom-header">
          <calendar-icon size="18" />
          {{ header.text }}
        </div>
      </template>
      <template #header-updatedAt="header">
        <div class="custom-header">
          <calendar-icon size="18" />
          {{ header.text }}
        </div>
      </template>
      <template #header-actions="header">
        <div class="custom-header">
          {{ header.text }}
        </div>
      </template>
      <!-- Action items for table -->
      <template #item-actions="{ id }">
        <div class="flex space-x-4 text-gray-500">
          <button
            class="flex items-center gap-1 text-indigo-500"
            @click="showDetails(id)"
          >
            <eye-icon size="18" /> Détails
          </button>
          <button class="flex items-center gap-1" @click="editProject">
            <edit-icon size="18" /> Modifier
          </button>
          <button class="flex items-center gap-1" @click="deleteProject">
            <trash-icon size="18" /> Supprimer
          </button>
        </div>
      </template>
    </EasyDataTable>
  </ClientOnly>
</template>
<style scoped>
.limitedLinesOne {
  --max-lines: 1;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--max-lines);
  line-clamp: var(--max-lines);
  display: -webkit-box;
  overflow: hidden;
}
.custom-header {
  display: flex;
  font-weight: 400;
  text-transform: lowercase;
  align-items: center;
  gap: 0.6em;
}
.eztbleRow {
  cursor: pointer;
}
.eztble {
  --easy-table-border: 0px solid #445269;
  --easy-table-row-border: 1px solid rgb(228 228 231);

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #4c4c4c;
  --easy-table-header-background-color: rgb(236 237 252 / 0.5);

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #676767;
  --easy-table-body-row-background-color: rgb(248 248 254);
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: rgb(236 237 252 / 0.5);

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: rgb(248 248 254);
  --easy-table-footer-font-color: #676767;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
