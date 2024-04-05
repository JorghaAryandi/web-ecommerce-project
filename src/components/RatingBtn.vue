<template>
  <div class="col-md-6">
    <div class="dropdown">
      <button
        class="btn btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownMenuLink2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        @click="toggleRating"
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
          <el-rate v-model="selectedRating" size="large" allow-half />

          <button
            v-if="selectedRating !== 0"
            class="btn btn-outline-dark col-md-auto me-2 rounded-5 text-end"
            @click="resetRating"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const viewedProducts = productStore.getViewedData;

const showRekomendasi2 = ref(false);
const selectedRating = ref(0);

const toggleRating = () => {
  showRekomendasi2.value = !showRekomendasi2.value;
};

const resetRating = () => {
  selectedRating.value = 0;
  updateFilteredData();
};

const updateFilteredData = () => {
  productStore.filterByRating(selectedRating.value);
};

watch(selectedRating, () => {
  updateFilteredData();
});
</script>
