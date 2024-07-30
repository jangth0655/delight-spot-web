import { LoginInitialState, useLoginState } from '@/store/useLoginState';
import { StoreListTabInitialState, useStoreListTabState } from '@/store/useStoreListTabStore';
import { StoreApi } from 'zustand';

const mockStore = <T>(hook: StoreApi<T>, state: Partial<T>) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state });
};

const mockUseStoreListTabStore = (state: Partial<StoreListTabInitialState>) => {
  mockStore(useStoreListTabState, state);
};

const mockUseLoginStore = (state: Partial<LoginInitialState>) => {
  mockStore(useLoginState, state);
};

export { mockUseStoreListTabStore, mockUseLoginStore };
