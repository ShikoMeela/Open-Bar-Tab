<script setup lang="ts">
import type { Product } from '~/models/product';

defineProps<{
    isSelected: boolean;
    product: Product;
    quantity?: number;
}>();

defineEmits<{
    (e: 'addProduct', product: any): void;
    (e: 'decreaseQuantity', id: number): void;
    (e: 'increaseQuantity', id: number): void;
}>();
</script>

<template>
    <b-a
            button="dark"
            class="w-100"
            @click="$emit('addProduct', product)"
            v-if="isSelected"
          >
            Select
          </b-a>
          <div
            v-else
            class="w-50 d-flex justify-content-between gap-10"
            style="margin: auto"
          >
            <b-button
              button="dark"
              @click="$emit('decreaseQuantity', product.id)"
            >
              <BIcon icon="memory:minus" />
            </b-button>
            <h4>{{ quantity }}</h4>
            <b-button
              button="dark"
              @click="$emit('increaseQuantity', product.id)"
            >
              <BIcon icon="bi:plus" />
            </b-button>
          </div>
</template>