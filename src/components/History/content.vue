<template>
  <div class="container py-5 mt-5">
    <div class="row gx-5 justify-content-center">
      <div class="col-lg-11 col-xl-9 col-xxl-8">
        <section>
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h2 class="text-primary fw-bolder mb-0">History</h2>
          </div>
          <div>
            <div v-if="!invoices || invoices.length === 0">
              <p>Tidak ada riwayat transaksi.</p>
            </div>
            <div v-else>
              <div
                class="card shadow border-0 rounded-4 mb-5"
                v-for="(invoice, index) in invoices"
                :key="index"
              >
                <div class="card-body p-5">
                  <div class="row align-items-center gx-5">
                    <div class="col text-center text-lg-start mb-4 mb-lg-0">
                      <div class="bg-light p-4 rounded-4">
                        <div class="text-primary fw-bolder mb-2">
                          {{ invoice.id }}
                        </div>
                        <!-- Tabel untuk menampilkan item -->
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Item Title</th>
                              <th scope="col">Item Price</th>
                              <th scope="col">Item Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <!-- Loop untuk setiap item dalam invoice -->
                            <tr
                              v-for="(item, itemIndex) in invoice.items"
                              :key="itemIndex"
                            >
                              <td>{{ item.title }}</td>
                              <td>${{ item.price }}</td>
                              <td>{{ item.quantity }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- Total harga invoice -->
                        <div class="fw-bolder text-end">
                          Total: ${{ invoice.totalPrice.toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const invoices = computed(() => cartStore.getAllInvoice);
</script>
