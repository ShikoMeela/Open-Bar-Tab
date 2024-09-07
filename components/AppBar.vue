<script setup lang="ts">
defineProps<{
    title: string;
    billTotal: string;
    showBillTotal: boolean;
}>();
</script>

<template>
    <Navbar theme="dark" background-color="dark">
    <Container type="fluid" class="justify-content-between">
      <NavbarBrand href="#"> Open Bar Tab </NavbarBrand>
      <div v-if="showBillTotal" style="color: white">
        <small
          >Bill Total: <strong>R{{ billTotal }}</strong></small
        >
      </div>
    </Container>
  </Navbar>
</template>