<script setup>
import { XIcon, SearchIcon } from 'vue-tabler-icons';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { onClickOutside } from '@vueuse/core';

const multiSelected = ref([]);
const teamMembers = ref([]);
const uniqueTeamMembers = computed(() =>
  Array.from(new Set(teamMembers.value))
);

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  label: {
    type: [String, Boolean],
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
defineEmits(['update:modelValue']);

// watch(uniqueTeamMembers, () => {
//   emit('update:modelValue')
// })

function addMemberToList(member) {
  teamMembers.value = [value];
}

const query = ref('');
const isLoading = ref(null);
const filteredMembers = ref([]);

const [parent] = useAutoAnimate();

let timeoutId;
watch(query, async () => {
  isLoading.value = true;
  clearTimeout(timeoutId);
  filteredMembers.value = [];
  timeoutId = setTimeout(async () => {
    if (query.value.length > 0) {
      console.log(query.value);
      const { data: members, pending } = await useFetch(
        'http://localhost:3004/people'
      );
      const member = JSON.stringify(members.value);
      const fetchedMembers = JSON.parse(member);
      filteredMembers.value = fetchedMembers.filter((m) =>
        m.first_name.toLowerCase().includes(query.value.toLowerCase())
      );
      isLoading.value = false;
    }
  }, 1000);
});

// Delete an option form select
function deleteMember(option) {
  const index = this.multiSelected.indexOf(option);
  if (index !== -1) {
    this.multiSelected.splice(index, 1);
  }
}

// Click Outside the search input
const memberSelect = ref(null);
onClickOutside(memberSelect, () => (query.value = ''));
</script>
<template>
  <label for="name" class="text-xs block">
    <div class="mb-1 font-medium text-indigo-800">{{ label }}</div>

    <div class="relative">
      <search-icon
        size="15"
        class="absolute top-1/2 text-zinc-600 -translate-y-1/2 left-2"
      />
      <input
        type="text"
        v-model="query"
        :id="name"
        class="outline-indigo-200 p-1 px-2 pl-7 w-full max-w-[250px] text-base border border-b-0 rounded-tl-md rounded-tr-md"
      />
    </div>
    <select
      ref="memberSelect"
      v-model="multiSelected"
      v-if="query.length > 0"
      multiple
      class="outline-0 p-1 px-2 text-base border w-full h-20"
    >
      <option v-for="member in filteredMembers">
        {{ member.first_name }}
      </option>
    </select>
    <!-- {{ multiSelected }} -->
    <!-- <div
      class="py-2 border gap-1 max-h-24 overflow-y-auto flex flex-wrap border-b-0 px-3"
    >
      <div
        class="p-1 px-2 bg-zinc-100 hover:bg-zinc-200 transition-colors border rounded-md"
        v-for="member in filteredMembers"
        @click="teamMembers = [...teamMembers, member]"
      >
        {{ member.first_name }}
      </div>
    </div> -->

    <div
      class="border flex max-h-40 gap-2 items-start overflow-y-auto flex-wrap shadow rounded-md rounded-tl-none p-3 py-5 rounded-br-md"
    >
      <span
        class="flex whitespace-nowrap rounded-full text-center justify-center w-fit items-center bg-zinc-100 border border-zinc-300 p-1"
        v-for="(amember, idx) in multiSelected"
        :key="idx"
      >
        <UIAvatarRegular w="24" class="mr-2" />
        {{ amember }}
        <i
          @click="deleteMember(amember)"
          class="rounded-full cursor-pointer ml-1 hover:bg-zinc-200 hover:text-zinc-700 text-zinc-600 w-5 h-5 grid place-items-center"
        >
          <x-icon size="12" />
        </i>
      </span>
    </div>
    <!-- {{ uniqueTeamMembers }} -->
  </label>
</template>
