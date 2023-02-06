<script setup>
import { onClickOutside } from '@vueuse/core';
import { PlusIcon } from 'vue-tabler-icons';
import useSWRV from 'swrv';

import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  helpers,
  alpha,
} from '@vuelidate/validators';
import {
  getAll as getAllTables,
  addTable as addNewTable,
} from '~~/fetch/tables';

const route = useRoute();

// Get All Tables for [id] project
const { data: tables, mutate } = useSWRV(
  `/api/tables/${route.params.id}`,
  getAllTables
);

const showAddTableModal = ref(false);

// Store
const openTicketModal = useStoreOpenNewTicketModal();

// Logic: Adding new table
const formNewTable = reactive({ tableName: '' });
const rules = {
  tableName: {
    required: helpers.withMessage('Ce champ ne peut pas être vide !', required),
    minLength: helpers.withMessage('Pas moins de 4 caractères !', minLength(4)),
    maxLength: helpers.withMessage('Pas plus de 8 caractères !', maxLength(8)),
    alpha: helpers.withMessage(
      'Des caractères alphabétiques uniquement !',
      alpha
    ),
  },
};
const $v = useVuelidate(rules, formNewTable);
async function addingTable() {
  const validated = await $v.value.$validate();
  if (validated) {
    await addNewTable(route.params.id, formNewTable.tableName);
    mutate();

    showAddTableModal.value = false;
    formNewTable.tableName = '';
    $v.value.$reset();
  }
}
// BTN ADD TABLE CLICK OUTSIDE
const btnAddTable = ref(null);
onClickOutside(btnAddTable, () => (showAddTableModal.value = false));
</script>

<template>
  <NuxtLayout>
    <Transition name="modal">
      <div v-if="openTicketModal" class="flex fixed inset-0 z-50">
        <ModalNewTicketForm />
      </div>
    </Transition>
    <header
      class="flex p-9 py-4 bg-task-4 text-white justify-between items-center"
    >
      <h2 class="text-2xl font-semibold">Tickets</h2>
      <UIBtnRegular text="Nouveau projet" type="white" v-slot:iconRight>
        <plus-icon size="20" />
      </UIBtnRegular>
      <!-- <button
        class="rounded-md p-2 font-medium px-3 text-sm text-indigo-700 bg-white flex items-center gap-2"
      >
        Nouveau projet
        <plus-icon size="20" />
      </button> -->
    </header>
    <div class="grid p-9 th-scroll gap-6 w-full h-full">
      <ClientOnly>
        <template #fallback>
          <UITableLoading class="th-scroll-child self-end" />
          <!-- <div class="th-scroll-child self-end" ref="btnAddTable">
              <UIBtnTableAdd @click="showAddTableModal = !showAddTableModal" />
            </div> -->
        </template>
        <UITableLoading v-if="!tables" />
        <UITableError v-if="tablesError" />
        <div
          class="th-scroll-child text-center text-sm p-4 rounded-md self-end border border-indigo-300 border-dashed text-indigo-800 bg-indigo-200/50"
          v-if="tables?.length === 0"
        >
          Aucun tableau pour ce projet !
        </div>
        <template v-else="tables">
          <BoardTable
            v-for="(table, idx) in tables"
            :key="idx"
            :table="table"
          />
        </template>
        <div class="th-scroll-child self-end" ref="btnAddTable">
          <UIBtnTableAdd @click="showAddTableModal = !showAddTableModal" />
          <Transition name="popup">
            <form
              v-if="showAddTableModal"
              @submit.prevent="addingTable"
              class="p-2 mt-4 rounded-sm shadow-xl border"
            >
              <div class="flex items-center gap-2 mb-2">
                <FormInputBase
                  label="Entrer le nom du tableau"
                  name="addtableinput"
                  v-model="formNewTable.tableName"
                  class="shadow-none flex-1"
                />
                <UIBtnCircle bType="submit" size="25" class="self-end mb-1">
                  <plus-icon size="20" />
                </UIBtnCircle>
              </div>
              <ul class="list-disc list-inside pl-2">
                <li
                  :key="addtableinputError.$uid"
                  v-for="addtableinputError in $v.tableName.$errors"
                  class="text-xs text-red-600 font-medium"
                >
                  {{ addtableinputError.$message }}
                </li>
              </ul>
            </form>
          </Transition>
        </div>
      </ClientOnly>
    </div>
  </NuxtLayout>
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
/* 
@media (min-width: 640px)
@media (min-width: 768px)
@media (min-width: 1024px)
*/
@media (min-width: 1500px) {
  .th-scroll {
    grid-auto-columns: 22%;
  }
}
.th-scroll {
  transform: rotateX(180deg);
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scrollbar-width: thin;
  scrollbar-color: #ced6ff #f5f5f5;
}
.th-scroll-child {
  transform: rotateX(180deg);
}
/* firefox */
.th-scroll::-webkit-scrollbar {
  width: 5px;
}
.th-scroll::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #edeef2;
}
.th-scroll::-webkit-scrollbar-thumb {
  color: #e4e8ff;

  border-radius: 10px;
  border: 1px solid transparent;
}

/* webkit browsers */
.th-scroll::-webkit-scrollbar,
.th-scroll::-webkit-scrollbar-thumb {
  /* height: 26px; */
  border-radius: 13px;
  background-clip: padding-box;
  background-color: #e4e8ff;
  border: 10px solid #e4e8ff;
}

.th-scroll::-webkit-scrollbar-thumb {
  /* color: tomato; */
  box-shadow: inset 0 0 0 10px;
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.25s ease-in-out;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
