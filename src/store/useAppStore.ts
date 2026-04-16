import { create } from 'zustand';
import type { AppState } from '@/types';

export const useAppStore = create<AppState>((set) => ({
  currentTab: 'home',
  user: null,
  totalXP: 0,
  preferredLanguage: 'fr',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setUser: (user) => set({ user }),
  addXP: (amount) => set((state) => ({ totalXP: state.totalXP + amount })),
  setPreferredLanguage: (lang) => set({ preferredLanguage: lang })
}));
