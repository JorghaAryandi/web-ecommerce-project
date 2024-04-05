<template>
  <div class="col-md-6">
    <div class="dropdown">
      <button
        class="btn btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownMenuLink1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        @click="toggleDropdown1"
      >
        <i class="bi bi-arrow-down-up"></i> Recommendations
      </button>
      <div
        class="dropdown-menu"
        :class="{ show: showRekomendasi1 }"
        aria-labelledby="dropdownMenuLink1"
      >
        <a class="dropdown-item" @click="sortProducts('highToLow')"
          >Price (High - Low)</a
        >
        <a class="dropdown-item" @click="sortProducts('lowToHigh')"
          >Price (Low - High)</a
        >
        <a class="dropdown-item" @click="sortProducts('mostRated')"
          >Rating (Most Rated)</a
        >
        <a class="dropdown-item" @click="sortProducts('leastRated')"
          >Rating (Least Rated)</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const products = computed(() => productStore.getMasterData);
const viewedProducts = computed(() => productStore.getViewedData);

const showRekomendasi1 = ref(false);

const toggleDropdown1 = () => {
  showRekomendasi1.value = !showRekomendasi1.value;
};

const sortProducts = (sortType) => {
  productStore.sortProducts(sortType);
};
</script>
