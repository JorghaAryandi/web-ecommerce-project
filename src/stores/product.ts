import { defineStore } from "pinia";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    masterData: [] as Product[],
    viewedData: [] as Product[],
    categories: [] as string[],
    detailProduct: [] as Product[],
  }),
  getters: {
    getMasterData: (state) => {
      return state.masterData;
    },
    getViewedData: (state) => {
      return state.viewedData;
    },
    getCategories: (state) => {
      return state.categories;
    },
    getDetailProduct: (state) => {
      return state.detailProduct;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        this.masterData = data;
        this.viewedData = data;
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    },
    async fetchDetailProduct(productId: string) {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const detail = await response.json();
        this.detailProduct = detail;
      } catch (error) {
        console.error("Error fetching Product:", error);
      }
    },

    setFilteredData(data: Product[]) {
      this.viewedData = data;
    },

    sortProducts(sortType: string) {
      const sortFunctions = {
        highToLow: (a: Product, b: Product) => b.price - a.price,
        lowToHigh: (a: Product, b: Product) => a.price - b.price,
        mostRated: (a: Product, b: Product) => b.rating.count - a.rating.count,
        leastRated: (a: Product, b: Product) => a.rating.count - b.rating.count,
      };
      this.viewedData.sort(sortFunctions[sortType]);
    },

    filterByRating(selectedRating) {
      this.viewedData =
        selectedRating === 0
          ? this.masterData
          : this.masterData.filter(
              (item) => item.rating.rate >= selectedRating
            );
    },
  },
});

export function setupStore() {
  return useProductStore();
}
