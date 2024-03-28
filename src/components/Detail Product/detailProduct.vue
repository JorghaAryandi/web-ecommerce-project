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
              <div class="input-group">
                <!-- Button for decreasing quantity -->
                <button
                  class="btn btn-outline-dark"
                  @click="decreaseQuantity(DetailProduct.id)"
                >
                  -
                </button>

                <!-- Input number for quantity -->
                <input
                  type="text"
                  class="form-control text-center"
                  :value="getQuantity(DetailProduct.id)"
                  @input="updateQuantity(DetailProduct.id, $event.target)"
                  pattern="[0-9]*"
                  oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                />

                <!-- Button for increasing quantity -->
                <button
                  class="btn btn-outline-dark"
                  @click="increaseQuantity(DetailProduct.id)"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div v-else class="d-flex">
            <button
              class="btn btn-outline-dark flex-shrink-0"
              @click="addToCart(DetailProduct)"
            >
              <i class="bi-cart-fill me-1"></i>
              Add to cart
            </button>
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

const route = useRoute();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const productStore = useProductStore();
const productId = route.params.id;

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

const addToCart = (product) => {
  cartStore.addItem(product);
};

const isInCart = (productId) => {
  return cartItems.value.some((item) => item.id === productId);
};

const getQuantity = (productId) => {
  const cartItem = cartItems.value.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

const quantity = ref(getQuantity(productId));

const updateQuantity = (productId, event) => {
  const parsedQuantity = parseInt(event.target.value);
  if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
    cartStore.updateCartItemQuantity(productId, parsedQuantity);
  } else {
    cartStore.removeCartItem(productId);
  }
};

const decreaseQuantity = (productId) => {
  cartStore.decreaseQuantity(productId);
  quantity.value = getQuantity(productId);
};

const increaseQuantity = (productId) => {
  cartStore.increaseQuantity(productId);
  quantity.value = getQuantity(productId);
};
</script>
