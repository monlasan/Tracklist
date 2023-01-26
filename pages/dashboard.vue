<script setup>
import { onClickOutside } from '@vueuse/core';
import { PlusIcon, BellIcon, LogoutIcon } from 'vue-tabler-icons';

import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  helpers,
  alpha,
} from '@vuelidate/validators';

// FETCH TABLES DATA
// onMounted(() => {
const {
  data: fetchedTables,
  pending,
  error,
} = useFetch('http://localhost:3001/table', { immediate: true });
// });

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
  <div class="flex-1 bg-task-1 flex border-t-4 border-indigo-600">
    <Head>
      <title>Dashboard</title>
    </Head>
    <Transition name="modal">
      <div v-if="openTicketModal" class="flex fixed inset-0 z-50">
        <ModalNewTicketForm />
      </div>
    </Transition>
    <UIAsideNavigation />
    <div class="flex-1 p-9 pr-0 flex flex-col overflow-hidden">
      <header class="flex justify-between mr-9">
        <div>
          <h2 class="text-2xl font-semibold">Tableaux</h2>
          <p class="text-xs text-zinc-800 mt-1">
            👋🏽 Vous avez
            <!-- <span class="text-indigo-500 font-semibold">{{
              tables.length
            }}</span> -->
            tableaux avec
            <span class="text-indigo-500 font-semibold">12</span> commentaires
            non lus et <span class="text-indigo-500 font-semibold">2</span>
            mentions non lus.
          </p>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-4">
            <UIBtnCircle size="35">
              <bell-icon size="22" />
            </UIBtnCircle>
            <UIBtnCircle type="red" size="35">
              <logout-icon size="20" />
            </UIBtnCircle>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex text-xs items-end flex-col">
              <span class="text-base font-medium">Jason Statam</span>
              <span class="text-zinc-500">Admin</span>
            </div>
            <UIAvatarRegular w="42" class="border-indigo-400 border-2" />
          </div>
        </div>
      </header>

      <div class="mt-10 grid th-scroll gap-6 w-full pb-4 h-full">
        <div
          v-if="pending"
          class="w-8 h-8 aspect-square animate-spin border-4 border-task-4 bg-white"
        ></div>
        <BoardTable
          v-for="(table, idx) in fetchedTables"
          :key="idx"
          :table="table"
        />
        <div class="th-scroll-child self-end" ref="btnAddTable">
          <UIBtnAddTable @click="showAddTableModal = !showAddTableModal" />
          <Transition name="popup">
            <form
              v-if="showAddTableModal"
              @submit.prevent="addingTable"
              class="p-2 mt-4 rounded-md shadow-xl border"
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
      </div>
    </div>
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
