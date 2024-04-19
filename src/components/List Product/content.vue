<template>
  <section>
    <Filter />
  </section>

  <CardProduct />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import Filter from "@/components/List Product/filter.vue";
import CardProduct from "@/components/List Product/cardProduct.vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const updateFilteredProducts = () => {
  productStore.updateFilteredProducts();
};

watchEffect(() => {
  updateFilteredProducts();
});
</script>
