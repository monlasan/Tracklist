<script setup>
import { PlusIcon, ListNumbersIcon } from 'vue-tabler-icons';
// ### PROTECTED ROUTE LOGIC #########
definePageMeta({
  middleware: ['auth'],
});
const user = useSupabaseUser();
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/login');
    }
  });
});
</script>
<template>
  <NuxtLayout>
    <Head>
      <title>Dashboard - Tracklist</title>
    </Head>
    <header
      class="flex p-9 py-4 bg-task-4 text-white justify-between items-center"
    >
      <h2 class="text-2xl font-semibold">Dashboard</h2>

      <button
        class="rounded-md p-2 font-medium px-3 text-sm text-indigo-700 bg-white flex items-center gap-2"
      >
        Nouveau projet
        <plus-icon size="20" />
      </button>
    </header>
    <div class="py-4 pt-16 max-w-7xl w-full mx-auto">
      <h1 class="text-2xl font-medium">Tracklist</h1>
      <div class="grid grid-cols-4 mt-20 gap-8">
        <div
          class="bg-indigo-50 shadow-sm aspect-square w-full flex gap-4 flex-col border-indigo-200 border rounded-sm p-4 px-6"
        >
          <div class="flex flex-col gap-2">
            <div class="text-task-5 block">
              <i
                class="w-8 text-indigo-600 h-8 border bg-indigo-500/20 rounded-sm grid place-items-center"
              >
                <list-numbers-icon size="20" />
              </i>
              Priorité
            </div>
            <b class="text-3xl text-indigo-700">45</b>
          </div>
          <ChartBar />
        </div>
      </div>
    </div>
    <!-- <pre class="text-xs h-20 overflow-y-auto mt-auto">{{ user }}</pre> -->
  </NuxtLayout>
</template>
