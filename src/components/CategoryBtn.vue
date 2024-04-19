<template>
  <div class="row">
    <div class="col-6 col-md-auto mb-2">
      <button
        class="btn btn-outline-dark fw-bold text-center shadow rounded-5"
        :class="{ 'active-btn': selectedCategory === 'All' }"
        @click="selectCategory('All')"
      >
        All
      </button>
    </div>
    <div
      class="col-6 col-md-auto mb-2"
      v-for="category in categories"
      :key="category"
    >
      <button
        class="btn btn-outline-dark fw-bold text-center shadow rounded-5"
        :class="{ 'active-btn': selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const categories = computed(() => productStore.getCategories);

const selectedCategory = computed({
  get: () => productStore.getSelectedCategory,
  set: (category) => productStore.setCategory(category),
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};
</script>

<style>
.active-btn {
  background-color: #212529;
  color: white;
}
</style>
