<script setup>
import { onClickOutside } from '@vueuse/core';
import {
  UsersIcon,
  TableIcon,
  Home2Icon,
  EditIcon,
  PowerIcon,
} from 'vue-tabler-icons';
const client = useSupabaseAuthClient();
const memberAuth = useAuthMetadataStore();

// avatarActionsPopup
const showAvatarActionsPopup = ref(false);
const avatarActionsPopup = ref(null);
onClickOutside(
  avatarActionsPopup,
  () => (showAvatarActionsPopup.value = false)
);
</script>
<template>
  <nav
    class="bg-white border-r p-6 fixed left-0 top-0 bottom-0 py-7 flex flex-col items-center text-xs gap-7 font-medium"
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
    <div class="relative mt-auto" ref="avatarActionsPopup">
      <Transition name="modal">
        <div
          v-if="showAvatarActionsPopup"
          class="flex flex-col absolute -top-24 z-10 p-2 py-1 divide-y rounded-sm shadow-xl bg-zinc-50"
        >
          <button
            class="flex hover:bg-zinc-100 items-center gap-2 p-2 px-3 rounded-sm text-gray-600 text-xs whitespace-nowrap"
            @click=""
          >
            <edit-icon size="18" class="text-zinc-700" />
            Edit
          </button>
          <button
            class="flex hover:bg-zinc-100 items-center gap-2 p-2 px-3 rounded-sm text-gray-600 text-xs whitespace-nowrap"
            @click="client.auth.signOut()"
          >
            <power-icon size="18" class="text-red-700" />
            Déconnexion
          </button>
        </div>
      </Transition>
      <UIAvatarRegular
        v-if="memberAuth?.photoUrl"
        w="45"
        class="cursor-pointer"
        @click="showAvatarActionsPopup = !showAvatarActionsPopup"
      />
      <button
        v-else
        @click="showAvatarActionsPopup = !showAvatarActionsPopup"
        class="w-[45px] h-[45px] text-white text-sm bg-indigo-700 rounded-full grid place-items-center"
      >
        {{ memberAuth?.lastName[0] }}{{ memberAuth?.firstName[0] }}
      </button>
      <!-- <button
        @click="showAvatarActionsPopup = !showAvatarActionsPopup"
        class="w-[45px] h-[45px] text-white text-sm bg-indigo-700 rounded-full grid place-items-center"
      >
        {{ member?.lastName[0] }}{{ member?.firstName[0] }}
      </button> -->
    </div>
  </nav>
</template>
