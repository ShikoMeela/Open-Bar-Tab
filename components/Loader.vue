<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  color: string;
}>();
</script>

<template>
  <Spinner
    v-if="isLoading"
    :text-color="color"
    style="position: fixed; top: 50vh; left: 50vw"
  />
</template>
