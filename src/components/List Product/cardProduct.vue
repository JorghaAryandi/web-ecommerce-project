<template>
  <section class="py-5">
    <div v-if="viewedProducts.length > 0" class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <div
          class="col mb-5"
          v-for="product in viewedProducts"
          :key="product.id"
        >
          <div class="card h-100 shadow mb-5 rounded">
            <!-- Product image-->
            <img
              class="card-img-top"
              :src="product.image"
              alt="..."
              style="height: 30vh"
            />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center fw-bold">
                <!-- Product name-->
                <h6>{{ product.title }}</h6>
                <!-- Product price-->
                <div class="h4 fw-bold">$ {{ product.price }}</div>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                <el-rate
                  v-model="product.rating.rate"
                  :disabled="true"
                  style="margin-right: 10px"
                />
                {{ product.rating.count }}
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="d-flex align-items-center justify-content-center">
                <!-- Check if product is already in cart -->

                <div v-if="isInCart(product.id)">
                  <inputQty :product="product" />
                </div>

                <template v-else class="d-flex">
                  <!-- Add to Cart button -->
                  <addToCartBtn :product="product" />

                  <button
                    class="btn btn-dark mb-3"
                    @click="ToDetail(product.id)"
                  >
                    Details
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container px-4 px-lg-5 mt-5">
      <div class="text-center mt-3">No data</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import addToCartBtn from "../addToCartbutton.vue";
import inputQty from "../inputQty.vue";

const router = useRouter();

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const productStore = useProductStore();
const products = computed(() => productStore.getMasterData);
const viewedProducts = computed(() => productStore.getViewedData);

onMounted(() => {
  productStore.fetchProducts();
  productStore.fetchCategories();
});

const isInCart = (productId) => {
  return cartItems.value.some((item) => item.id === productId);
};

const ToDetail = (productId) => {
  router.push(`/DetailProduct/${productId}`);
};
</script>
