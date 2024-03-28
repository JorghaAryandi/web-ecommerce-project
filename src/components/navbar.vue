<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
  >
    <div class="container px-4 px-lg-5">
      <router-link class="navbar-brand" to="/">E-Commerce</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <!-- Menggunakan router-link untuk mengarahkan ke halaman Home -->
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/History"
              >History</router-link
            >
          </li>
        </ul>

        <form class="d-flex">
          <router-link class="btn btn-outline-dark me-2" to="/cart">
            <i class="bi-cart-fill me-1"></i>
            Cart
            <span class="badge bg-dark text-white ms-1 rounded-pill">{{
              totalCartQuantity
            }}</span>
          </router-link>

          <router-link class="btn btn-outline-dark" to="/Profile">
            <i class="bi-person-fill me-1"></i>
            Profile
            <span class="badge bg-primary text-white ms-1 rounded-pill"
              >$ {{ balanceProfile.toFixed(2) }}</span
            >
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";

const cartStore = useCartStore();
const totalCartQuantity = computed(() => cartStore.getTotalQuantity);

const profileStore = useProfileStore();
const balanceProfile = computed(() => profileStore.getBalance);
</script>
