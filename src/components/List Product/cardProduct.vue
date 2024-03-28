<template>
  <section class="py-5">
    <div
      v-if="productsbyCategory.length > 0"
      class="container px-4 px-lg-5 mt-5"
    >
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <div
          class="col mb-5"
          v-for="product in productsbyCategory"
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
                  <div class="input-group">
                    <!-- Button for decreasing quantity -->
                    <button
                      class="btn btn-outline-dark mb-3"
                      @click="decreaseQuantity(product.id)"
                    >
                      -
                    </button>

                    <!-- Input number for quantity -->
                    <input
                      type="text"
                      class="form-control form-control-sm text-center mb-3"
                      :value="getQuantity(product.id)"
                      @input="updateQuantity(product.id, $event.target)"
                      pattern="[0-9]*"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                    />

                    <!-- Button for increasing quantity -->
                    <button
                      class="btn btn-outline-dark mb-3"
                      @click="increaseQuantity(product.id)"
                    >
                      +
                    </button>

                    <button
                      class="btn btn-dark mb-3 text-end"
                      @click="ToDetail(product.id)"
                    >
                      Details
                    </button>
                  </div>
                </div>
                <template v-else class="d-flex">
                  <!-- Add to Cart button -->
                  <button
                    class="btn btn-outline-dark me-2 mb-3"
                    @click="addToCart(product)"
                  >
                    Add to Cart
                  </button>

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
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <div class="col mb-5" v-for="product in products" :key="product.id">
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
                $ {{ product.price }}
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
              <div class="text-center">
                <!-- Check if product is already in cart -->
                <div v-if="isInCart(product.id)">
                  <!-- Quantity control -->
                  <div class="input-group">
                    <!-- Button for decreasing quantity -->
                    <button
                      class="btn btn-outline-dark mb-3"
                      @click="decreaseQuantity(product.id)"
                    >
                      -
                    </button>

                    <!-- Input number for quantity -->
                    <input
                      type="text"
                      class="form-control form-control-sm text-center mb-3"
                      :value="getQuantity(product.id)"
                      @input="updateQuantity(product.id, $event.target)"
                      pattern="[0-9]*"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                    />

                    <!-- Button for increasing quantity -->
                    <button
                      class="btn btn-outline-dark mb-3"
                      @click="increaseQuantity(product.id)"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

const router = useRouter();

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const productStore = useProductStore();
const products = computed(() => productStore.getMasterData);
const productsbyCategory = computed(() => productStore.getViewedData);

onMounted(() => {
  productStore.fetchProducts();
  productStore.fetchCategories();
});

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
};

const increaseQuantity = (productId) => {
  cartStore.increaseQuantity(productId);
};

const ToDetail = (productId) => {
  router.push(`/DetailProduct/${productId}`);
};
</script>
