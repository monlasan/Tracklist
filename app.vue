<script setup>
import useSWRV from 'swrv';
import { getMember } from './fetch/member';
const auth = useSupabaseUser();
const memberAuth = useAuthMetadataStore();
// const { data, mutate, error } = useSWRV(
//   `/api/members/${auth.value?.id}`,
//   getMember
// );
// if (error) {
//   console.log('errored');
// }
// onMounted(() => {
//   watchEffect(async () => {
//     if (auth.value) {
//       mutate();
//       memberAuth.value = data;
//     } else {
//       memberAuth.value = {};
//     }
//   });
// });
</script>
<template>
  <UILayout>
    <!-- <UINavbar /> -->
    <NuxtPage />
    <!-- <div id="newTicketModal"></div> -->
  </UILayout>
</template>
