<script setup>
import { PlusIcon, DotsIcon, MessageIcon } from 'vue-tabler-icons';
</script>
<template>
  <div class="p-4 bg-task-2 th-scroll-child min-w-[300px] rounded-md self-end">
    <div class="flex justify-between">
      <h4 class="text-lg text-zinc-800 font-medium">En progrès</h4>
      <UIBtnCircle> <dots-icon size="20" /> </UIBtnCircle>
    </div>
    <ul class="flex flex-col my-4 gap-4">
      <Ticket
        title="Lorem ipssum dolor sit amet consectetur adipisicing elit."
        createdAt="15 Nov 2022 - 12h30"
      />
      <Ticket
        title="Lorem ipssum dolor sit amet consectetur adipisicing elit."
        createdAt="15 Nov 2022 - 12h30"
      />
    </ul>
    <UIBtnRegular text="My button" full type="zinc" v-slot:iconLeft>
      <plus-icon size="20" />
    </UIBtnRegular>
  </div>
</template>
