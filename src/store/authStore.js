import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAdmin: false,
    loginAsAdmin: () => set({ isAdmin: true }),
    logout: () => set({ isAdmin: false }),
}));

export default useAuthStore;
