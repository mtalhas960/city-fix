import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAdmin: true,
    loginAsAdmin: () => set({ isAdmin: true }),
    logout: () => set({ isAdmin: false }),
}));

export default useAuthStore;
