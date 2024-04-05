<template>
  <div class="container px-4 px-lg-5 mt-5 d-flex justify-content-between">
    <CategoryBtn />
    <!-- Dropdowns -->
    <div class="row text-end d-flex">
      <!-- Sorting -->
      <SortingBtn />
      <!-- Filter By Rating -->
      <RatingBtn />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryBtn from "../CategoryBtn.vue";
import SortingBtn from "../SortingBtn.vue";
import RatingBtn from "../RatingBtn.vue";
</script>
