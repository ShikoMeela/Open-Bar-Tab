<script setup lang="ts">
import type { Product } from '~/models/product';

defineProps<{
    headerVariables: string[];
    currentBill: Product[];
    billTotal: string;
    showAveragePerPerson: boolean;
    averagePerPerson: string;
}>();

defineEmits<{
    (e: 'exportCSV'): void;
    (e: 'exportPDF'): void;
}>();
</script>

<template>
    <div id="billTable">
        <b-table>
        <b-tbody>
            <b-tr>
            <b-th  v-for="header in headerVariables" scope="row"> {{ header }} </b-th>
            </b-tr>
            <b-tr v-for="item in currentBill">
            <b-td>{{ item.name }}</b-td>
            <b-td>{{ item.round }}</b-td>
            <b-td>{{ item.quantity }}</b-td>
            <b-td>R{{ (item.price * (item?.quantity ?? 1)).toFixed(2) }}</b-td>
            </b-tr>
        </b-tbody>
        </b-table>
        <div>Total R{{ billTotal }}</div>
        <div v-if="showAveragePerPerson">
        R{{ averagePerPerson }} per person
        </div>
    </div>
    <b-button button="dark" @click="$emit('exportCSV')" class="m-2">
        Export CSV
    </b-button>
    <b-button @click="$emit('exportPDF')" button="dark" class="m-2">
        Export PDF
    </b-button>
</template>