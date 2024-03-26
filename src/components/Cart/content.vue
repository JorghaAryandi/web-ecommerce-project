<style scoped>
    .custom-checkbox input[type="checkbox"] {
        transform: scale(1.5); 
        margin-right: 10px; 
    }
    .custom-checkbox {
        text-align: center;
    }
</style>
<template>
<section class="py-5 mt-5 mb-8 " >
                <div class="container" v-if="cartItems.length > 0">
                <div class="row w-100">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h3 class="display-5 mb-2 text-center fw-bolder">Cart</h3>
                        <p class="mb-5 text-center">
                            <i class="text-info font-weight-bold">{{ totalItems }}</i> Item di Keranjang</p>
                            <div class="text-end">
                                <button class="btn btn-danger  me-3" @click="removeCheckedItems">
                                    Hapus
                                </button>
                            </div>
                        <table id="shoppingCart" class="table table-condensed table-responsive">
                            <thead>
                                <tr class="text-center">
                                    <th>Select</th>
                                    <th style="width:60%">Produk</th>
                                    <th style="width:12%">Price</th>
                                    <th style="width:10%">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartItems" :key="item.id">
                                    <td v-if="item.checked" data-th="" class="custom-checkbox">
                                        <input type="checkbox" checked @change="toggleCheckbox(item)">
                                    </td>
                                    <td v-else data-th="" class="custom-checkbox">
                                        <input type="checkbox" @change="toggleCheckbox(item)">
                                    </td>
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-md-3 text-left">
                                                <img alt="Product Image" :src="item.image" class="img-fluid d-none d-md-block rounded mb-2 shadow">
                                            </div>
                                            <div class="col-md-9 text-left mt-sm-2">
                                                
                                                <h6>{{item.title}}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Price" class="text-center">$ {{ item.price }}</td>
                                    <td data-th="Quantity">
                                        <input type="number" class="form-control form-control-lg text-center" v-model="item.quantity" min="1">
                                    </td>
                                  
                                </tr>
                            </tbody>
                        </table>

                        <div class="text-end">
                            <h4>Subtotal:</h4>
                            <h2 class="fw-bolder">{{subtotal}}</h2>
                        </div>
                      
                        
                    </div>
                    <div class="d-flex justify-content-between mb-5">
                        
                        <router-link type="button" class="btn btn-secondary" to="/">
                            <i class="bi bi-arrow-left"></i> Batal
                        </router-link>
                        <button type="button" class="btn btn-primary" @click="checkout">
                            Checkout <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
               
            </div>

            <div v-else class="container">
                <div class="row w-100">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h3 class="display-5 mb-2 text-center fw-bolder">Cart</h3>
                    </div>
                    
                    <div class="h3 fw-bolder text-center">
                        There are no items in the cart 
                    </div>
                </div>
               
            </div>
  
        </section>

        
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useProfileStore } from '@/stores/profile';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getAllItems);
const totalItems = computed(() => cartStore.getTotalItemCart);
const removeCheckedItems = cartStore.removeCheckedItems;
const toggleCheckbox = cartStore.toggleCheckbox;

const profileStore = useProfileStore();
const balanceProfile = computed(() => profileStore.getBalance);

const subtotal = computed(() => {
    const checkedItems = cartStore.getCheckedItems;
    return checkedItems.reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
    }, 0).toFixed(2);
});

const checkout = () => {
    cartStore.checkoutAndAddToHistory();
};

</script>  
