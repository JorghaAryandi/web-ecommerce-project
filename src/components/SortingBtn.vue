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
        <a class="dropdown-item" @click="sortProducts('highToLow')">
          Price (High - Low)
          <i class="bi bi-check" v-if="sortingType === 'highToLow'"></i>
        </a>
        <a class="dropdown-item" @click="sortProducts('lowToHigh')">
          Price (Low - High)
          <i class="bi bi-check" v-if="sortingType === 'lowToHigh'"></i>
        </a>
        <a class="dropdown-item" @click="sortProducts('mostRated')">
          Rating (Most)
          <i class="bi bi-check" v-if="sortingType === 'mostRated'"></i>
        </a>
        <a class="dropdown-item" @click="sortProducts('leastRated')">
          Rating (Least)
          <i class="bi bi-check" v-if="sortingType === 'leastRated'"></i>
        </a>
        <a class="dropdown-item" @click="sortProducts('AtoZ')">
          A to Z
          <i class="bi bi-check" v-if="sortingType === 'AtoZ'"></i>
        </a>
        <a class="dropdown-item" @click="sortProducts('ZtoA')">
          Z to A
          <i class="bi bi-check" v-if="sortingType === 'ZtoA'"></i>
        </a>
        <a
          v-if="sortingType !== ''"
          class="dropdown-item"
          @click="sortProducts('default')"
        >
          Back to Default
          <i class="bi bi-check" v-if="sortingType === ''"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const showRekomendasi1 = ref(false);

const sortingType = computed({
  get: () => productStore.getSortingType,
  set: (type) => productStore.setSortingType(type),
});

const toggleDropdown1 = () => {
  showRekomendasi1.value = !showRekomendasi1.value;
};

const sortProducts = (sortType) => {
  sortingType.value = sortType;
  if (sortType == "default") {
    sortingType.value = "";
  }
};
</script>

<style scoped>
.dropdown-item i {
  float: right;
  font-size: 1.2em;
  font-weight: bold;
  color: blue;
}
</style>
