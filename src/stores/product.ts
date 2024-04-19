import { defineStore } from "pinia";
import axios from "axios";
import { Product } from "@/stores/property/Product";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    masterData: [] as Product[],
    viewedData: [] as Product[],
    categories: [] as string[],
    selectCategory: "",
    detailProduct: [] as Product[],
    sortingType: "",
    ratingRate: 0,
    filteredProducts: [] as Product[],
  }),
  getters: {
    getMasterData: (state) => {
      return state.masterData;
    },
    getViewedData: (state) => {
      return state.viewedData;
    },
    getDetailProduct: (state) => {
      return state.detailProduct;
    },
    getCategories: (state) => {
      return state.categories;
    },
    getSortingType: (state) => {
      return state.sortingType;
    },
    getRatingRate: (state) => {
      return state.ratingRate;
    },
    getSelectedCategory: (state) => {
      return state.selectCategory;
    },
    getFilteredProducts: (state) => {
      return state.filteredProducts;
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
    async fetchByCategory(category: string) {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await response.json();
        this.viewedData = data;
      } catch (error) {
        console.error(
          `Error fetching Products by category ${category}:`,
          error
        );
      }
    },

    async updateFilteredProducts() {
      try {
        // Fetch produk jika belum ada data masterData
        if (this.masterData.length === 0) {
          await this.fetchProducts();
        }

        let filtered = [...this.masterData]; // Salin semua produk dari masterData

        // Filter berdasarkan kategori yang dipilih
        if (this.selectCategory !== "All") {
          filtered = filtered.filter((product) =>
            product.category.includes(this.selectCategory)
          );
        } else if (this.selectCategoryChanged) {
          await this.fetchProducts();
        }
        this.selectCategoryChanged = false;

        // Lakukan pengurutan berdasarkan jenis pengurutan yang dipilih
        switch (this.sortingType) {
          case "lowToHigh":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "highToLow":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "mostRated":
            filtered.sort((a, b) => b.rating.count - a.rating.count);
            break;
          case "leastRated":
            filtered.sort((a, b) => a.rating.count - b.rating.count);
            break;
          case "AtoZ":
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "ZtoA":
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            filtered.sort((a, b) => a.id - b.id);
            break;
        }

        // Filter berdasarkan nilai peringkat yang dipilih
        if (this.ratingRate > 0) {
          filtered = filtered.filter(
            (product) => product.rating.rate >= this.ratingRate
          );
        }

        // Set filteredProducts dengan hasil filter
        this.filteredProducts = filtered;
      } catch (error) {
        console.error("Error updating filtered products:", error);
      }
    },

    //Set Actions
    setCategory(category: string) {
      this.selectCategory = category;
    },

    setSortingType(sortType: string) {
      this.sortingType = sortType;
    },

    setRatingRate(ratingRate: number) {
      this.ratingRate = ratingRate;
    },

    sortProducts(sortType: string) {
      this.setSortingType(sortType);

      const sortFunctions = {
        default: (a: Product, b: Product) => a.id - b.id,
        highToLow: (a: Product, b: Product) => b.price - a.price,
        lowToHigh: (a: Product, b: Product) => a.price - b.price,
        mostRated: (a: Product, b: Product) => b.rating.count - a.rating.count,
        leastRated: (a: Product, b: Product) => a.rating.count - b.rating.count,
        AtoZ: (a: Product, b: Product) => a.title.localeCompare(b.title),
        ZtoA: (a: Product, b: Product) => b.title.localeCompare(a.title),
      };
      if (sortFunctions[sortType]) {
        this.viewedData.sort(sortFunctions[sortType]);
      } else {
        console.error(`Sorting type '${sortType}' is not supported.`);
      }
    },

    filterByRating(selectedRating: number) {
      if (selectedRating === 0) {
        return this.viewedData;
      } else {
        this.viewedData = this.viewedData.filter(
          (product) => product.rating.rate >= selectedRating
        );
      }
    },
  },
});

export function setupStore() {
  return useProductStore();
}
