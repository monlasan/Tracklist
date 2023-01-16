<script setup>
import { PlusIcon, Message2Icon } from 'vue-tabler-icons';
</script>
<template>
  <div>
    <UIBtnCircle><plus-icon size="20" /></UIBtnCircle>
    <UIBadge text="Badge" type="red" v-slot:icon>
      <message2-icon size="20"
    /></UIBadge>
    <UIBadge text="Badge" type="gray" />
    <UIAvatarStack />
    <UIBtnRegular text="RegularButton" />
    <UIBtnRegular text="Full width button" type="gray" v-slot:iconLeft full>
      <message2-icon size="20" />
    </UIBtnRegular>
  </div>
</template>
