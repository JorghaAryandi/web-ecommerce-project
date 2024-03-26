<template>
    <section class="vh-100" style="background-color: #eee;">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card" style="border-radius: 15px;">
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img :src="dataProfile.profile_image" class="rounded-circle img-fluid" style="width: 100px;" />
                </div>
                <h4 class="mb-2">{{ dataProfile.username }}</h4>
                <p class="text-muted mb-4">{{ '@' + dataProfile.username.toLowerCase().replace(' ', '') }} <span class="mx-2">|</span> <a href="#!">{{ dataProfile.email }}</a></p>
                
                <div class="d-flex justify-content-center text-center mt-5 mb-2">
                  <div>
                    <p class="h4 fw-bolder text-primary">$ {{ dataProfile.wallet.balance }}</p>
                    <p class="text-muted">Wallets Balance</p>
                  </div>
                  <!-- Anda bisa menambahkan kode di sini untuk menampilkan Income amounts dan Total Transactions -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </template>
    
    <script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useProfileStore } from '@/stores/profile';
    
    const profileStore = useProfileStore();
    const dataProfile = computed(() => profileStore.getData);
    

    </script>
    