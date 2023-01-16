<script setup>
import { PlusIcon } from 'vue-tabler-icons';
</script>
<template>
  <Head>
    <title>Dashboard</title>
  </Head>
  <div class="flex-1 bg-task-1 flex">
    <UIAsideNavigation />

    <div class="flex-1 p-9 flex flex-col overflow-hidden">
      <div>
        <h2 class="text-2xl font-semibold">Tableaux</h2>
        <p class="text-xs text-zinc-800 mt-1">
          👋🏽 Vous avez
          <span class="text-indigo-500 font-semibold">3</span> tableaux avec
          <span class="text-indigo-500 font-semibold">12</span> commentaires non
          lus et <span class="text-indigo-500 font-semibold">2</span>
          mentions non lus.
        </p>
      </div>
      <div class="mt-10 grid gap-6 th-scroll w-full pb-4 h-full">
        <BoardTable />
        <BoardTable />
        <div class="th-scroll-child self-end">
          <button
            class="flex items-center justify-center hover:shadow transition-shadow self-end gap-3 p-3 px-5 text-indigo-800 rounded-md bg-task-2"
          >
            <div
              class="w-7 h-7 rounded-full shadow-md shadow-indigo-900/10 text-indigo-500 bg-white grid place-items-center"
            >
              <plus-icon size="19" />
            </div>
            <span class="whitespace-nowrap">Ajouter un tableau</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
