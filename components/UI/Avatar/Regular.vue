<script setup>
import PlaceholderImg from '~~/assets/images/itachi.jpg';
const props = defineProps({
  w: String,
  src: String,
});
</script>
<template>
  <img
    :src="src ?? PlaceholderImg"
    alt="itachi-sama"
    :width="w"
    class="object-cover aspect-square rounded-full"
  />
</template>
