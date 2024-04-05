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
const viewedProducts = computed(() => productStore.getViewedData);

const selectedCategory = ref("All");
const selectedRating = ref(0); // Added for rating

const selectCategory = (category) => {
  selectedCategory.value = category;
  updateFilteredData();
};

const updateFilteredData = () => {
  if (selectedCategory.value === "All") {
    productStore.filterByRating(selectedRating.value);
  } else {
    productStore.fetchByCategory(selectedCategory.value);
  }
};
</script>

<style>
.active-btn {
  background-color: #212529;
  color: white;
}
</style>
