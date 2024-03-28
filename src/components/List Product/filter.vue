<template>
  <div class="container px-4 px-lg-5 mt-5 d-flex justify-content-between">
    <div class="row">
      <div class="col-6 col-md-auto mb-2">
        <button
          class="btn btn-outline-dark fw-bold text-center shadow rounded-5"
          :class="{ 'active-btn': selectedCategory === 'All' }"
          @click="filterByCategory('All')"
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
          @click="filterByCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="row text-end d-flex">
      <!-- Dropdown 1 -->
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

      <!-- Dropdown 2 -->
      <div class="col-md-6">
        <div class="dropdown">
          <button
            class="btn btn-outline-dark dropdown-toggle"
            type="button"
            id="dropdownMenuLink2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleDropdown2"
          >
            <i class="bi bi-arrow-down-up"></i> Filter By Rating
          </button>
          <div
            class="dropdown-menu dropdown-menu-end"
            :class="{ show: showRekomendasi2 }"
            aria-labelledby="dropdownMenuLink2"
          >
            <!-- Dropdown untuk filter by rating -->
            <div class="p-3">
              <el-rate
                v-model="selectedRating"
                size="large"
                allow-half
                @change="filterByRating(selectedRating)"
              />

              <button
                v-if="selectedRating"
                class="btn btn-outline-dark col-md-auto me-2 rounded-5 text-end"
                @click="resetRating"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
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
const categories = computed(() => productStore.getCategories);
const detailProduct = computed(() => productStore.getDetailProduct);

const showRekomendasi1 = ref(false);
const showRekomendasi2 = ref(false);

const toggleDropdown1 = () => {
  showRekomendasi1.value = !showRekomendasi1.value;
};

const toggleDropdown2 = () => {
  showRekomendasi2.value = !showRekomendasi2.value;
};

let selectedCategory = "";
const filterByCategory = (category: string) => {
  selectedCategory = category;
  updateFilteredData();
};

let selectedRating = 0;
const filterByRating = (rating) => {
  selectedRating = rating;
  updateFilteredData();
};

const resetRating = () => {
  selectedRating = 0;
  updateFilteredData();
};

const updateFilteredData = () => {
  let filteredData = [...products.value];

  if (selectedCategory !== "All") {
    filteredData = filteredData.filter((item) =>
      item.category.includes(selectedCategory)
    );
  }

  if (selectedRating !== 0) {
    filteredData = filteredData.filter(
      (item) => item.rating.rate >= selectedRating
    );
  }

  productStore.setFilteredData(filteredData);
};

watch([() => selectedCategory, () => selectedRating], () => {
  updateFilteredData();
});

const sortProducts = (sortType) => {
  productStore.sortProducts(sortType);
};
</script>

<style>
.active-btn {
  background-color: #212529;
  color: white;
}
</style>
