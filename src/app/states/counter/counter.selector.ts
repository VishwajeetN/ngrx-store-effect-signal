import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectCounterState = (state: AppState) => state.counter;

// Whole CounterState from AppState i.e bigger slice, select smaller slice of count data.
export const selectCount = createSelector(
  selectCounterState,
  (state)=> state.count
)
