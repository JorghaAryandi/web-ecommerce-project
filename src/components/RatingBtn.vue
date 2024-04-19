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
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const showRekomendasi2 = ref(false);

const toggleRating = () => {
  showRekomendasi2.value = !showRekomendasi2.value;
};

const selectedRating = computed({
  get: () => productStore.getRatingRate,
  set: (rating) => productStore.setRatingRate(rating),
});

const resetRating = () => {
  selectedRating.value = 0;
};
</script>
