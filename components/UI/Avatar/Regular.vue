<script setup>
const props = defineProps({
  w: String,
});
</script>
<template>
  <img
    src="../../../assets/images/itachi.jpg"
    alt="itachi-sama"
    :width="w"
    class="object-cover aspect-square rounded-full"
  />
</template>
