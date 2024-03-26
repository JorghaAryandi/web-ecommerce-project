<style>
    .active-btn {
        background-color: #212529;
        color: white;
    }
</style>
<template>
<section>
        <div class="container px-4 px-lg-5 mt-5 d-flex justify-content-between">
            <div class="row d-flex">
                <div class="col-6 col-md-auto mb-2">
                    <button 
                        class="btn btn-outline-dark fw-bold text-center shadow rounded-5"
                        :class="{ 'active-btn': selectedCategory === 'All' }"
                        @click="filterByCategory('All')">
                        All
                    </button>
                </div>
                <div class="col-6 col-md-auto mb-2" v-for="category in categories" :key="category">
                    <button 
                        class="btn btn-outline-dark fw-bold text-center shadow rounded-5"
                        :class="{ 'active-btn': selectedCategory === category }"
                        @click="filterByCategory(category)">
                        {{ category }}
                    </button>
                </div>
             </div>
    
        <div class="row text-end">
            <div class="dropdown">
                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
                    <i class="bi bi-arrow-down-up"></i> Rekomendasi
                </button>
                <div class="dropdown-menu dropdown-menu-end" :class="{ 'show': showRekomendasi }" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" @click="sortProducts('highToLow')">Harga (Tertinggi - Terendah)</a>
                    <a class="dropdown-item" @click="sortProducts('lowToHigh')">Harga (Terendah - Tertinggi)</a>
                    <a class="dropdown-item" @click="sortProducts('mostRated')">Tamu (Paling Banyak)</a>
                    <a class="dropdown-item" @click="sortProducts('leastRated')">Tamu (Paling Sedikit)</a>
                </div>
                </div>
        </div>

        </div>
      
      </section>
       

      <section>
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row">
                <div class="col-md-4 col-sm-6 mb-2 d-flex flex-column justify-content-between">
                    <h4 class="mb-3">Filter by Rating</h4>
                    <div class="col-6 align-content-center">
                        <el-rate 
                            v-model="selectedRating" 
                            size="large"
                            allow-half
                            @change="filterByRating(selectedRating)" />

                    <button 
                        v-if="selectedRating"
                        class="btn btn-outline-dark col-md-auto rounded-5"
                        @click="resetRating">
                        Reset
                    </button>
                    </div>
                    
                </div>
            </div>
        </div>
      </section>


<section class="py-5">
    <div v-if="productsbyCategory.length > 0" class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div class="col mb-5" v-for="product in productsbyCategory" :key="product.id">
                <div class="card h-100 shadow mb-5 rounded">
                    <!-- Product image-->
                    <img class="card-img-top" :src="product.image" alt="..." style="height: 30vh;"/>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center fw-bold">
                            <!-- Product name-->
                            <h6>{{ product.title }}</h6>
                            <!-- Product price-->
                            <div class="h4 fw-bold">
                                $ {{ product.price }}
                            </div>
                            
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <el-rate
                                v-model="product.rating.rate"
                                :disabled="true"
                                style="margin-right: 10px;" />
                            {{ product.rating.count }}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <!-- Check if product is already in cart -->
                            <template v-if="isInCart(product.id)">
                                <!-- Input number for quantity -->
                                <input type="number" class="form-control form-control-lg text-center" :value="getQuantity(product.id)" @input="updateQuantity(product.id, $event)">
                            </template>
                            <template v-else>
                                <!-- Add to Cart button -->
                                <button class="btn btn-outline-dark mt-auto" @click="addToCart(product)">Add to Cart</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div class="col mb-5" v-for="product in products" :key="product.id">
                <div class="card h-100 shadow mb-5 rounded">
                    <!-- Product image-->
                    <img class="card-img-top" :src="product.image" alt="..." style="height: 30vh;"/>
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
                                style="margin-right: 10px;" />
                            {{ product.rating.count }}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <!-- Check if product is already in cart -->
                            <template v-if="isInCart(product.id)">
                                <!-- Input number for quantity -->
                                <input type="number" class="form-control form-control-lg text-center" :value="getQuantity(product.id)" @input="updateQuantity(product.id, $event)">
                            </template>
                            <template v-else>
                                <!-- Add to Cart button -->
                                <button class="btn btn-outline-dark mt-auto" @click="addToCart(product)">Add to Cart</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useProfileStore } from '@/stores/profile'

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);

const profileStore = useProfileStore();
const balanceProfile = computed(() => profileStore.getBalance);

const productStore = useProductStore();
const products = computed(() => productStore.getMasterData);
const productsbyCategory = computed(() => productStore.getViewedData);

const showRekomendasi = ref(false);
const selectedRating = ref(0);

onMounted(() => {
    productStore.fetchProducts();
    productStore.fetchCategories();
    });

const addToCart = (product) => {
    cartStore.addItem(product); 
};

const isInCart = (productId) => {
    return cartItems.value.some(item => item.id === productId);
};

const getQuantity = (productId) => {
    const cartItem = cartItems.value.find(item => item.id === productId);
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

const categories = computed(() => productStore.getCategories);
let selectedCategory = '';
const filterByCategory = (category: string) => {
            selectedCategory = category;
            productStore.filterByCategory(category);
        };

const toggleDropdown = () => {
    showRekomendasi.value = !showRekomendasi.value;
};

const sortProducts = (sortType) => {
    productStore.sortProducts(sortType);
};

const filterByRating = (selectedRating) => {
    productStore.filterByRating(selectedRating);
};

const resetRating = () => {
    selectedRating.value = 0;
    productStore.fetchProducts();
};

</script>