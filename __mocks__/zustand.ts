import { act } from '@testing-library/react';
import * as zustand from 'zustand';

// __mock__ 하위에 위치한 파일 -> vitest나 jest에서 특정 모듈을 자동 모킹
const { create: actualCreate, createStore: actualCreateStore } = jest.requireActual<typeof zustand>('zustand');

const storeResetFn = new Set<() => void>();

const create = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFn.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

afterEach(() => {
  act(() => storeResetFn.forEach((reset) => reset()));
});

export { create };
