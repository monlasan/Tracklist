<script setup>
import { XIcon, SearchIcon } from 'vue-tabler-icons';
</script>
<template>
  <label for="ticket_add_member" class="text-xs block">
    <div class="mb-1 font-medium">Ajouter un participant</div>

    <div class="relative">
      <search-icon
        size="15"
        class="absolute top-1/2 text-zinc-600 -translate-y-1/2 left-2"
      />
      <input
        type="text"
        id="ticket_add_member"
        class="outline-indigo-200 p-1 px-2 pl-7 w-full max-w-[250px] text-base border border-b-0 rounded-tl-md rounded-tr-md"
      />
    </div>

    <div
      class="border flex flex-wrap shadow rounded-md rounded-tl-none p-3 rounded-br-md"
    >
      <span
        class="flex whitespace-nowrap rounded-full text-center justify-center w-fit items-center bg-zinc-100 border border-zinc-300 p-1"
      >
        <UIAvatarRegular w="24" class="mr-2" />
        Hannah Montana
        <i
          class="rounded-full cursor-pointer ml-1 hover:bg-zinc-200 hover:text-zinc-700 text-zinc-600 w-5 h-5 grid place-items-center"
        >
          <x-icon size="12" />
        </i>
      </span>
      <span class="mx-auto">Aucun participant...</span>
    </div>
  </label>
</template>
