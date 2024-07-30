import { create } from 'zustand';

type ListSelectTab = 'all' | 'food' | 'cafe';

interface StoreListTabInitialState {
  selectedTab: ListSelectTab;
  setSelectedTab: (tab: ListSelectTab) => void;
}

const useStoreListTabState = create<StoreListTabInitialState>((set) => ({
  selectedTab: 'all',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}));

export { useStoreListTabState };
export type { StoreListTabInitialState };
