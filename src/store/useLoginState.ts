import { ACCESS_TOKEN } from '@/constants';
import { getCookie } from 'cookies-next';
import { create } from 'zustand';

interface LoginInitialState {
  is_member?: boolean;
  token?: string;
  code?: string | null;
  setLoginState: (state: { is_member?: boolean; token?: string; code?: string | null }) => void;
}

const useLoginState = create<LoginInitialState>((set) => ({
  is_member: undefined,
  token: getCookie(ACCESS_TOKEN),
  code: null,
  setLoginState: (state) => set((prev) => ({ ...prev, ...state })),
}));

export { useLoginState };
export type { LoginInitialState };
