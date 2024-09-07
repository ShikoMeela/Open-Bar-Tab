<script setup lang="ts">
defineProps<{
  id: string;
  header: string;
  placement: string;
}>();
</script>

<template>
  <Offcanvas :id="id" :placement="placement">
    <OffcanvasHeader>
      <OffcanvasTitle>{{ header }}</OffcanvasTitle>
      <CloseButton dismiss="offcanvas" />
    </OffcanvasHeader>
    <OffcanvasBody>
      <slot></slot>
    </OffcanvasBody>
  </Offcanvas>
</template>
