<script setup>
import { PlusIcon, Message2Icon } from 'vue-tabler-icons';
const baseInputExample = ref('');
const multichecks = ref([]);
const checkedMembers = ref([]);
</script>
<template>
  {{ baseInputExample }}
  <div class="flex px-40 py-16 flex-wrap gap-8">
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
    <FormInputBase
      label="Labelle Or Not"
      type="text"
      v-model="baseInputExample"
    />
    {{ multichecks }}
    <FormCheckboxMember v-model="multichecks" name="i" :value="i" />
    <FormCheckboxMember v-model="multichecks" name="a" :value="a" />
    <FormCheckboxMember v-model="multichecks" name="c" :value="c" />
    <FormAddMember
      label="Ajouter un membre"
      name="addMemberInput"
      v-model:checked="checkedMembers"
    />
    <FormMemberAdd />
  </div>
</template>
