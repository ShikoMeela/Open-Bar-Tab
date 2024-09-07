<script setup lang="ts">
defineProps<{
  numberOfPeople: number;
  isDisabled: boolean;
}>();

defineEmits<{
  (e: "changeValue", value: number): void;
}>();
</script>

<template>
  <BFormLabel> Enter number of people sharing the bill: </BFormLabel>
  <BFormInput
    class="m-2"
    type="number"
    :model-value="numberOfPeople.toString()"
    @update:model-value="(value) => $emit('changeValue', Number(value))"
  />
  <b-button
    button="dark"
    class="m-2 w-100"
    dismiss="offcanvas"
    :disabled="isDisabled"
  >
    Done
  </b-button>
</template>
