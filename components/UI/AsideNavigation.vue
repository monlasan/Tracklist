<script setup>
import { UsersIcon, TableIcon, Home2Icon } from 'vue-tabler-icons';
</script>
<template>
  <nav
    class="bg-white border-r p-6 py-7 flex flex-col items-center text-xs gap-7 font-medium"
  >
    <NuxtLink to="/overview" class="flex group flex-col items-center"
      ><div
        class="w-12 h-12 grid place-items-center group-hover:text-task-3 transition-colors duration-100 rounded-full hover:shadow-sm hover:bg-task-1"
      >
        <home2-icon size="22" stroke-width="2.1" />
      </div>
      Aperçu</NuxtLink
    >
    <NuxtLink to="/board" class="flex group flex-col items-center"
      ><div
        class="w-12 h-12 grid place-items-center group-hover:text-task-3 transition-colors duration-100 rounded-full hover:shadow-sm hover:bg-task-1"
      >
        <table-icon size="22" stroke-width="2.1" />
      </div>
      Tableaux</NuxtLink
    >
    <NuxtLink to="/team" class="flex group flex-col items-center"
      ><div
        class="w-12 h-12 grid place-items-center group-hover:text-task-3 transition-colors duration-100 rounded-full hover:shadow-sm hover:bg-task-1"
      >
        <users-icon size="22" stroke-width="2.1" />
      </div>
      Team</NuxtLink
    >
    <img
      src="../../assets/images/Tracklist-Rounded-Color.png"
      alt="Tracklist Logo"
      width="40"
      class="accent-indigo-600 mt-auto"
    />
  </nav>
</template>
