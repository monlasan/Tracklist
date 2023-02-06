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
import { updateTable } from '~~/fetch/tables';

const props = defineProps({
  tableId: Number,
});
const emit = defineEmits(['cancelUpdate']);
const route = useRoute();
const { mutate } = useSWRV(`/api/tables/${route.params.id}`);

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
    await updateTable(formNewTableName.tableName, props.tableId);

    formNewTableName.tableName = '';
    $v.value.$reset();
    mutate();
    emit('cancelUpdate');
  }
}
</script>
<template>
  <form @submit.prevent="updatingTable" class="bg-white p-2 rounded-sm m-4">
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
