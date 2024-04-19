<template>
  <div class="input-group">
    <!-- Button for decreasing quantity -->
    <button
      class="btn btn-outline-dark mb-3"
      @click="decreaseQuantity(product.id)"
    >
      -
    </button>

    <!-- Input number for quantity -->
    <input
      type="number"
      class="form-control form-control-sm text-center mb-3"
      :value="getQuantity(product.id)"
      @input="updateQuantity(product.id, $event.target)"
      min="1"
    />

    <!-- Button for increasing quantity -->
    <button
      class="btn btn-outline-dark mb-3"
      @click="increaseQuantity(product.id)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useCartStore } from "@/stores/cart";
import { Cart } from "@/stores/property/Cart";

const props = defineProps<{
  product: Cart;
}>();

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const getQuantity = (productId) => {
  const cartItem = cartItems.value.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

const updateQuantity = (productId, target) => {
  const value = target.value.trim();
  if (!isNaN(value) && parseInt(value) >= 1) {
    const parsedQuantity = parseInt(value);
    cartStore.updateCartItemQuantity(productId, parsedQuantity);
  } else {
    cartStore.removeCartItem(productId);
  }
};

const decreaseQuantity = (productId) => {
  cartStore.decreaseQuantity(productId);
};

const increaseQuantity = (productId) => {
  cartStore.increaseQuantity(productId);
};
</script>
