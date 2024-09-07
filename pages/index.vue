<script setup lang="ts">
const { data: products, status } = await useFetch("/api/beverage", {
  transform: (_products) => _products.data,
});
const openBarStore = useOpenBarStore();
const description =
  "Click select to add, you will have the ability to increase or decrease your quantity";
</script>

<template>
  <AppBar
    title="Open Bar Tab"
    :bill-total="openBarStore.billTotal"
    :show-bill-total="openBarStore.viewBill"
  />
  <div class="container" v-if="status !== 'idle'">
    <div
      class="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4"
    >
      <OpenBarCard
        :description="description"
        :products="products ?? []"
        :is-selected="(id) => openBarStore.isSelected(id)"
        :quantity="(id) => openBarStore.getProductQuantity(id)"
        v-on:add-product="(product) => openBarStore.addProduct(product)"
        v-on:decrease-quantity="(id) => openBarStore.decreaseQuantity(id)"
        v-on:increase-quantity="(id) => openBarStore.increaseQuantity(id)"
      />
    </div>

    <Actions
      :view-add-round="openBarStore.viewAddRound"
      :view-bill="openBarStore.viewBill"
      v-on:add-round="openBarStore.addRound()"
    />

    <Loader :is-loading="status == 'pending'" color="dark" />

    <Overlay id="offcanvasResponsive" placement="end" header="Detailed Bill">
      <DetailedBill
        :header-variables="['Beverage', 'Round', 'Quantity', 'Total Price']"
        :current-bill="openBarStore.submittedTabs"
        :average-per-person="openBarStore.averagePerPerson"
        :bill-total="openBarStore.billTotal"
        :show-average-per-person="openBarStore.numberOfPeople > 0"
        v-on:export-c-s-v="openBarStore.exportToCSV()"
        v-on:export-p-d-f="openBarStore.exportPDF()"
      />
    </Overlay>

    <Overlay id="offcanvasSplitBill" placement="end" header="Split Bill">
      <SplitBill
        :number-of-people="openBarStore.numberOfPeople"
        v-on:change-value="(value) => openBarStore.changeNumberOfPeople(value)"
        :is-disabled="!(openBarStore.numberOfPeople > 0)"
      />
    </Overlay>
  </div>
</template>
