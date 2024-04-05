<template>
  <button class="btn btn-outline-dark me-2 mb-3" @click="addToCart(product)">
    <i class="bi-cart-fill me-1"></i>
    Add to cart
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string[];
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
}>();

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addItem(product);
};
</script>
