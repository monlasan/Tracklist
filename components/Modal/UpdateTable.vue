<script setup>
import useSWRV from 'swrv';

import { PlusIcon } from 'vue-tabler-icons';
import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  helpers,
  alpha,
} from '@vuelidate/validators';

const props = defineProps({
  tableId: Number,
});
const emit = defineEmits(['cancelUpdate']);

const { mutate: mutateTables } = useSWRV('http://localhost:3001/table');

// Logic: Adding new table
const formNewTableName = reactive({ tableName: '' });
const rules = {
  tableName: {
    required: helpers.withMessage('Ce champ ne peut pas être vide !', required),
    minLength: helpers.withMessage('Pas moins de 4 caractères !', minLength(4)),
    alpha: helpers.withMessage(
      'Des caractères alphabétiques uniquement !',
      alpha
    ),
  },
};
const $v = useVuelidate(rules, formNewTableName);
async function updatingTable() {
  const validated = await $v.value.$validate();
  if (validated) {
    await fetch(`http://localhost:3001/table/${props.tableId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formNewTableName.tableName,
      }),
    });

    formNewTableName.tableName = '';
    $v.value.$reset();
    mutateTables();
    emit('cancelUpdate');
  }
}
</script>
<template>
  <form @submit.prevent="updatingTable" class="bg-white p-2 rounded-md m-4">
    <div class="flex items-center gap-2 mb-2">
      <FormInputBase
        label="Entrer le nom du tableau"
        name="updateTable"
        v-model="formNewTableName.tableName"
        class="shadow-none flex-1"
      />
      <UIBtnCircle bType="submit" size="25" class="self-end mb-1">
        <plus-icon size="20" />
      </UIBtnCircle>
    </div>
    <ul class="list-disc list-inside pl-2">
      <li
        :key="updateTableErrors.$uid"
        v-for="updateTableErrors in $v.tableName.$errors"
        class="text-xs text-red-600 font-medium"
      >
        {{ updateTableErrors.$message }}
      </li>
    </ul>
  </form>
</template>
