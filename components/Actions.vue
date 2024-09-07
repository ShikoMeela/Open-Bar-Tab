<script setup lang="ts">
defineProps<{
    viewAddRound: boolean;
    viewBill: boolean;
}>();

defineEmits<{
    (e: 'addRound'): void;
}>();
</script>

<template>
     <div id="actions">
    <div v-if="viewAddRound" style="color: inherit">
        <small
          >Once you are happy with your selection(s), add the round to your
          tab</small
        >
      </div>

    <div class="d-flex flex-column flex-sm-row">
        <b-button
          button="dark"
          class="m-2"
          v-if="viewAddRound"
          @click="$emit('addRound')"
        >
          Add Round
        </b-button>

        <b-button
          button="dark"
          class="m-2"
          toggle="offcanvas"
          v-if="viewBill"
          target="#offcanvasSplitBill"
        >
          Split Bill
        </b-button>

        <b-button
          button="dark"
          class="m-2"
          v-if="viewBill"
          toggle="offcanvas"
          target="#offcanvasResponsive"
        >
          View Detailed Bill
        </b-button>
      </div>
      </div>
</template>