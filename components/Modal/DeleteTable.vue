<script setup>
import useSWRV from 'swrv';
import { deleteTable } from '~~/fetch/tables';

const route = useRoute();
const props = defineProps({
  tableId: Number,
});
const emit = defineEmits(['cancelDelete']);

const { mutate } = useSWRV(`/api/tables/${route.params.id}`);

async function deletingTable() {
  deleteTable(props.tableId);
  emit('cancelDelete');
  mutate();
}
</script>
<template>
  <div class="bg-white p-4 rounded-md m-4">
    <p class="text-xs font-medium text-center mb-4">
      Vous êtes sûr de vouloir supprimer ce tableau ?
    </p>
    <div class="flex items-center gap-3">
      <UIBtnRegular
        text="Annuler"
        type="gray"
        full
        @click="$emit('cancelDelete')"
      />
      <UIBtnRegular text="Supprimer" type="red" full @click="deletingTable" />
    </div>
  </div>
</template>
