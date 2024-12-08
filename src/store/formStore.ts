import { create } from "zustand";
import { MortgageStore } from "../types";

/**
 * This code defines a Zustand store for managing state in a React application.
 * Zustand is a lightweight, fast, and flexible state-management library for React.
 * The `create` function from Zustand initializes the store with state and actions.
 *
 * --- Code Explanation ---
 *
 * 1. **What does the store manage?**
 *    - `calculationData`: Holds mortgage calculation data (initially `null`).
 *    - `showResult`: A boolean indicating whether the calculation results should be displayed (initially `false`).
 *    - Actions:
 *        - `setCalculationData(data)`: Updates the `calculationData` state.
 *        - `setShowResult(show)`: Updates the `showResult` state.
 *        - `clearCalculationData()`: Resets both `calculationData` and `showResult` to their initial states.
 *
 * 2. **Key Functions:**
 *    - The `set` function, provided by Zustand, is used to update the store's state.
 *      Example: `set({ calculationData: data })` merges the new state into the store.
 *
 * 3. **The Hook (`useMortgageStore`):**
 *    - `useMortgageStore` is a custom hook returned by `create`. This hook allows React components to:
 *        - Access the store's state (e.g., `calculationData` and `showResult`).
 *        - Invoke actions to modify the state (e.g., `setCalculationData` or `clearCalculationData`).
 *    - When a component uses this hook, it connects to the shared Zustand store instance, allowing shared state across components.
 *
 * 4. **Conceptually Similar to a Constructor:**
 *    - While `create` is not a constructor in the traditional sense, it initializes and sets up the store when the app runs. All components that use the `useMortgageStore` hook share the same store instance.
 *
 **/
export const useMortgageStore = create<MortgageStore>((set) => ({
  calculationData: null,
  showResult: false,
  setCalculationData: (data) => set({ calculationData: data }),
  setShowResult: (show) => set({ showResult: show }),
  clearCalculationData: () => set({ calculationData: null, showResult: false }),
}));
