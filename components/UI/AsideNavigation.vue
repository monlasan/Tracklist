<script setup>
import { UsersIcon, TableIcon, Home2Icon } from 'vue-tabler-icons';
</script>
<template>
  <nav
    class="bg-white border-r p-6 py-7 flex flex-col items-center text-xs gap-7 font-medium"
  >
    <UIBtnNavLink to="dashboard" text="Dashboard">
      <home2-icon size="22" stroke-width="2.1" />
    </UIBtnNavLink>
    <UIBtnNavLink to="projects" text="Projets">
      <table-icon size="22" stroke-width="2.1" />
    </UIBtnNavLink>
    <UIBtnNavLink to="members" text="Membres">
      <users-icon size="22" stroke-width="2.1" />
    </UIBtnNavLink>
    <UIAvatarRegular w="45" class="mt-auto" />

    <!-- <img
      src="../../assets/images/Tracklist-Rounded-Color.png"
      alt="Tracklist Logo"
      width="40"
      class="accent-indigo-600 mt-auto"
    /> -->
  </nav>
</template>
