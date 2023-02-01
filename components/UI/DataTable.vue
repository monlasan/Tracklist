<script setup>
import {
  KeyIcon,
  TrashIcon,
  EditIcon,
  LetterNIcon,
  UsersIcon,
  CalendarIcon,
} from 'vue-tabler-icons';

const headers = [
  { text: 'id', value: 'id', sortable: true },
  { text: 'nom', value: 'name' },
  { text: 'contributeurs', value: 'contributors' },
  { text: 'créer le', value: 'createdAt', sortable: true },
  { text: 'modifié le', value: 'updatedAt', sortable: true },
];

const items = [
  {
    id: '1',
    name: 'Promox',
    contributors: 30,
    createdAt: '2023-01-30T06:49:07.429Z',
    updatedAt: '2023-01-30T06:59:07.429Z',
  },
  {
    id: '2',
    name: 'Vander',
    contributors: 12,
    createdAt: '2023-01-30T06:59:07.429Z',
    updatedAt: '2023-01-30T06:59:07.429Z',
  },
  {
    id: '3',
    name: 'JinxAll',
    contributors: 45,
    createdAt: '2023-01-30T06:36:07.429Z',
    updatedAt: '2023-01-30T06:59:07.429Z',
  },
  {
    id: '4',
    name: 'Silkroad',
    contributors: 7,
    createdAt: '2023-01-30T06:59:07.429Z',
    updatedAt: '2023-01-30T06:59:07.429Z',
  },
];
</script>
<template>
  <ClientOnly>
    <EasyDataTable
      rows-per-page-message="Lignes par message"
      empty-message="Aucun projet trouvé"
      theme-color="#1230e3"
      table-class-name="eztble"
      :headers="headers"
      :items="items"
    >
      <template #header-id="header">
        <div class="custom-header">
          <key-icon size="18" />
          {{ header.text }}
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
    </EasyDataTable>
  </ClientOnly>
</template>
<style scoped>
.custom-header {
  display: flex;
  font-weight: 400;
  text-transform: lowercase;
  align-items: center;
  gap: 0.6em;
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
