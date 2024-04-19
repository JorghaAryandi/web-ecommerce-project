<template>
  <section class="py-5" v-if="DetailProduct" :key="DetailProduct.id">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            :src="DetailProduct.image"
            alt="Product image"
          />
        </div>
        <div class="col-md-6">
          <div class="small mb-1 text-uppercase">
            {{ DetailProduct.category }}
          </div>
          <h1 class="display-5 fw-bolder">{{ DetailProduct.title }}</h1>
          <div class="fs-5 mb-5">
            <span class="h4 fw-bold">$ {{ DetailProduct.price }}</span>
          </div>
          <p class="lead">
            {{ DetailProduct.description }}
          </p>

          <div v-if="isInCart(DetailProduct.id)" class="d-flex">
            <div class="col-md-3">
              <inputQty :product="DetailProduct" />
            </div>
          </div>

          <div v-else class="d-flex">
            <addToCartBtn :product="DetailProduct" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import addToCartBtn from "../addToCartbutton.vue";
import inputQty from "../inputQty.vue";

const route = useRoute();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const productStore = useProductStore();
const productId = route.params.id as string;

const DetailProduct = ref(null);

onMounted(() => {
  productStore.fetchDetailProduct(productId);
});

watch(
  () => productStore.getDetailProduct,
  (newVal) => {
    DetailProduct.value = newVal;
  }
);

const isInCart = (productId) => {
  return cartItems.value.some((item) => item.id === productId);
};

const getQuantity = (productId) => {
  const cartItem = cartItems.value.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

const quantity = ref(getQuantity(productId));
</script>
