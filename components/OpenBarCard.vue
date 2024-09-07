<script setup lang="ts">
import type { Product } from '~/models/product';

    defineProps<{
        products: Product[];
        description: string;
        isSelected: (id: number) => boolean;
        quantity: (id: number) => number;
    }>();

    defineEmits<{
      (e: 'addProduct', product: Product): void;
      (e: 'decreaseQuantity', id: number): void;
      (e: 'increaseQuantity', id: number): void;
    }>();
</script>

<template>
 <Card
        v-for="item in products"
        :key="item.id"
        class="d-flex justify-content-center"
      >
        <CardImgTop
          height="230"
          :src="`/images${item.image}`"
          :alt="item.name"
        />
        <CardBody>
          <CardTitle class="d-flex justify-content-between">
            <span>{{ item.name }}</span>
            <span>R{{ item.price.toFixed(2) }}</span>
          </CardTitle>
          <CardText>
            {{  description }}
          </CardText>
          <ButtonToggle 
            :is-selected="!isSelected(item.id)"
            :product="item"
            :quantity="quantity(item.id)"
            v-on:add-product="$emit('addProduct', item)"
            v-on:decrease-quantity="$emit('decreaseQuantity', item.id)"
            v-on:increase-quantity="$emit('increaseQuantity', item.id)"
          />
        </CardBody>
      </Card>
</template>