import { defineStore } from 'pinia';

interface Profile {
    username: string;
    email: string;
    wallet: {
        balance: number;
    }
    profile_image: string;
}

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        profile: null as Profile | null,
    }),
    getters: {
        getData: (state) => {
            return state.profile;
        },
        getBalance: (state) => {
            return state.profile?.wallet.balance ?? 0;
        },
    },
    actions: {
        async fetchProfile() {
            try {
                const response = await fetch('/src/stores/profile.json');
                const data = await response.json();
                this.profile = data;
            } catch (error) {
                console.error('Error fetching Profile:', error);
            }
        },
        updateBalance(newBalance: number) {
            if (this.profile) {
                this.profile.wallet.balance = newBalance;
            }
        },
    },
});

export function setupProfileStore() {
    return useProfileStore();
}
