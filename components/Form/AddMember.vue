<script setup>
import { XIcon, SearchIcon } from 'vue-tabler-icons';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { onClickOutside } from '@vueuse/core';
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

const showMemberList = ref(false);
const query = ref('');
const selectedMembers = ref([]);

const { data: members } = useFetch('http://localhost:3004/people', {
  immediate: true,
});
const filteredMembers = computed(() =>
  members.value.filter((member) =>
    member.first_name.toLowerCase().includes(query.value.toLowerCase())
  )
);

function deleteMember(idx) {
  selectedMembers.value = selectedMembers.value.filter((_, id) => id !== idx);
}

const [parent] = useAutoAnimate();
onClickOutside(parent, () => (showMemberList.value = false));
</script>

<template>
  <div>
    <label :for="name" class="mb-1 text-xs font-medium text-indigo-800">{{
      label
    }}</label>
    <div class="" ref="parent">
      <div class="relative">
        <search-icon
          size="15"
          class="absolute top-1/2 text-zinc-600 -translate-y-1/2 left-2"
        />
        <input
          type="text"
          :id="name"
          v-model="query"
          @focus="showMemberList = true"
          class="outline-indigo-200 p-1 px-2 pl-7 w-full max-w-[250px] text-base border border-b-0 rounded-tl-md rounded-tr-md"
        />
      </div>
      <ul
        class="outline-0 flex flex-col text-base border border-b-0 w-full h-40 overflow-y-auto"
        v-if="showMemberList"
      >
        <label
          class="flex items-center gap-3 cursor-pointer hover:bg-zinc-100 px-3 py-1"
          :for="member.first_name"
          v-for="member in filteredMembers"
        >
          <input
            type="checkbox"
            :id="member.first_name"
            class="w-4 h-4 bg-gray-500 accent-task-3"
            :value="member.first_name"
            v-model="selectedMembers"
          />
          <span>{{ member.first_name }}</span>
        </label>
      </ul>

      <div
        class="border flex max-h-40 gap-2 items-start overflow-y-auto flex-wrap shadow rounded-md rounded-tl-none p-3 rounded-br-md"
      >
        <small
          class="text-xs mx-auto text-gray-700"
          v-if="selectedMembers.length === 0"
          >Aucun membre ajouté...</small
        >
        <span
          class="flex whitespace-nowrap rounded-full text-center justify-center w-fit items-center bg-zinc-100 border border-zinc-300 p-1"
          v-for="(member, idx) in selectedMembers"
          :key="idx"
        >
          <UIAvatarRegular w="24" class="mr-2" />
          {{ member }}
          <i
            class="rounded-full cursor-pointer ml-1 hover:bg-zinc-200 hover:text-zinc-700 text-zinc-600 w-5 h-5 grid place-items-center"
            @click="deleteMember(idx)"
          >
            <x-icon size="12" />
          </i>
        </span>
      </div>
    </div>
  </div>
</template>
