<script setup>
import { onClickOutside } from '@vueuse/core';
import { PlusIcon } from 'vue-tabler-icons';
const tables = useTables();
const showAddTableModal = ref(false);

function addingTable() {
  return tables.value.push({
    title: Math.floor(Math.random() * 10000),
    tickets: [{ t: Math.floor(Math.random() * 100) }],
  });
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
    <UIAsideNavigation />
    <div class="flex-1 p-9 pr-0 flex flex-col overflow-hidden">
      <div>
        <h2 class="text-2xl font-semibold">Tableaux</h2>
        <p class="text-xs text-zinc-800 mt-1">
          👋🏽 Vous avez
          <span class="text-indigo-500 font-semibold">{{ tables.length }}</span>
          tableaux avec
          <span class="text-indigo-500 font-semibold">12</span> commentaires non
          lus et <span class="text-indigo-500 font-semibold">2</span>
          mentions non lus.
        </p>
      </div>
      <div class="mt-10 grid th-scroll gap-6 w-full pb-4 h-full">
        <BoardTable
          v-for="table in tables"
          :key="table.title"
          :name="table.title"
          :tickets="table.tickets"
        />
        <div class="th-scroll-child self-end" ref="btnAddTable">
          <UIBtnAddTable @click="showAddTableModal = !showAddTableModal" />
          <Transition name="popup">
            <form
              v-if="showAddTableModal"
              @submit.prevent="addingTable"
              class="p-2 mt-4 rounded-md shadow-xl border"
            >
              <!-- <small
                class="font-medium text-xs mb-2 text-indigo-800 inline-block"
                >Entrer le nom du tableau</small
              > -->
              <div class="flex items-center gap-2">
                <FormInputBase
                  label="Entrer le nom du tableau"
                  name="addtableinput"
                  class="shadow-none flex-1"
                />

                <UIBtnCircle bType="submit" class="self-end mb-1">
                  <plus-icon size="20" />
                </UIBtnCircle>
              </div>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* @media (min-width: 640px) {
  .th-scroll {}
} */
/* @media (min-width: 768px) {
  .th-scroll {
  }
}
@media (min-width: 1024px) {
  .th-scroll {
  }
} */
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
/* firefix */
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
  transition: all 0.25s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(7px);
}
</style>
