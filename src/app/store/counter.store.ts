import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface CounterState {
  count: number;
}

const initialCounterstate: CounterState = {
  count: 0,
};

export const CounterStore = signalStore(
  withState(initialCounterstate),
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
  })),
  withMethods(({ count, ...store }) => ({
    incrementCount() {
      patchState(store, { count: count() + 1 });
    },
    decrementCount() {
      patchState(store, { count: count() - 1 });
    },
    resetCount() {
      patchState(store, { count: 0 });
    },
  }))
);
