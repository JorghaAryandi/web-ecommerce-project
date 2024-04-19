<template>
  <button class="btn btn-outline-dark me-2 mb-3" @click="addToCart(product)">
    <i class="bi-cart-fill me-1"></i>
    Add to cart
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";
import { Cart } from "@/stores/property/Cart";

const props = defineProps<{
  product: Cart;
}>();

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addItem(product);
};
</script>
