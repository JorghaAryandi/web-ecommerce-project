import { defineStore } from 'pinia';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { useProfileStore } from '@/stores/profile';

interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
    checked: boolean;
}

interface Invoice {
    id: string;
    items: CartItem[];
    totalPrice: number;
}

const profileStore = useProfileStore();

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        history: [] as Invoice[],
    }),
    getters: {
        getTotalItemCart: (state) => {
            return state.items.length;
        },
        getAllItems: (state) => {
            return state.items;
        },
        getCheckedItems: (state) => {
            return state.items.filter(item => item.checked);
        },
        getAllInvoice: (state) => {
            return state.history;
        },
    },
    actions: {
        addItem(product: Product) {
            const existingItemIndex = this.items.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                this.items[existingItemIndex].quantity++;
                console.log('Jumlah item diperbarui:', this.items[existingItemIndex]);
            } else {
                const newItem: CartItem = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    checked: true,
                    quantity: 1,
                };
                this.items.push(newItem);
                console.log('Item berhasil ditambahkan ke keranjang:', newItem);
            }
            console.log('Seluruh item di dalam keranjang:', this.items);
        },
        removeItem(product: Product) {
            const existingItemIndex = this.items.findIndex(item => item.id === product.id);
            
            if (existingItemIndex !== -1) {
                this.items.splice(existingItemIndex, 1);
                console.log('Item berhasil dihapus dari keranjang:', product);
            } else {
                console.log('Item tidak ditemukan dalam keranjang');
            }
            
            console.log('Seluruh item di dalam keranjang:', this.items);
        },
        removeCheckedItems() {
            const checkedItems = this.getCheckedItems;
            checkedItems.forEach(item => {
                const index = this.items.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    this.items.splice(index, 1);
                    console.log('Item berhasil dihapus dari keranjang:', item);
                }
            });
        },
        removeCartItem(productId: string) {
            this.items = this.items.filter(item => item.id !== productId);
        },
        toggleCheckbox(item: CartItem) {
            const index = this.items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                this.items[index].checked = !this.items[index].checked;
            }
        },
        updateQuantity(productId: string, quantity: number): void {
            if (!isNaN(quantity) && quantity > 0) {
                this.items.forEach(item => {
                    if (item.id === productId) {
                        item.quantity = quantity;
                    }
                });
            } else {
                this.removeItem(productId);
            }
        },
        addToHistory(items: CartItem[]) {
            function formatDateTime(date: Date): string {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                return `${year}${month}${day}-${hours}${minutes}${seconds}`;
            }
        
            const currentTime = new Date();
            const formattedDateTime = formatDateTime(currentTime);
        
            const invoice: Invoice = {
                id: "INV " + formattedDateTime,
                items: items,
                totalPrice: items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0),
            };
        
            this.history.push(invoice);
            console.log('Invoice added to history:', invoice);
        },
        async checkoutAndAddToHistory() {
            const checkedItems = this.getCheckedItems;
            const total = checkedItems.reduce((total, item) => {
                return total + parseFloat(item.price) * item.quantity;
            }, 0);

            let balance = profileStore.getBalance;
    
            if (total > balance) {
                 Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Balance is Not Enough!'
                });
                return;
                return;
            }
    
            const newBalance = balance - total;
            
            profileStore.updateBalance(newBalance); // Update the balance
            
            if (checkedItems.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'There are no checked items for checkout'
                });
                return;
            }

            this.addToHistory(checkedItems);
            this.removeCheckedItems();
            Swal.fire({
                icon: 'success',
                title: 'Checkout Successful!',
            });
        },
        
        updateCartItemQuantity(itemId: string, newQuantity: number) {
            const itemIndex = this.items.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                this.items[itemIndex].quantity = newQuantity;
            }
        },
        
    },
});
