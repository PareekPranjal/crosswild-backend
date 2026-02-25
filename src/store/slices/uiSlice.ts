import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UIState {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isMobileSearchOpen: boolean;
}

const initialState: UIState = {
  isCartOpen: false,
  isMenuOpen: false,
  isMobileSearchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCart: (state) => { state.isCartOpen = true; },
    closeCart: (state) => { state.isCartOpen = false; },
    toggleCart: (state) => { state.isCartOpen = !state.isCartOpen; },
    openMenu: (state) => { state.isMenuOpen = true; },
    closeMenu: (state) => { state.isMenuOpen = false; },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
      if (state.isMenuOpen) state.isMobileSearchOpen = false;
    },
    openMobileSearch: (state) => {
      state.isMobileSearchOpen = true;
      state.isMenuOpen = false;
    },
    closeMobileSearch: (state) => { state.isMobileSearchOpen = false; },
    toggleMobileSearch: (state) => {
      state.isMobileSearchOpen = !state.isMobileSearchOpen;
      if (state.isMobileSearchOpen) state.isMenuOpen = false;
    },
  },
});

export const {
  openCart, closeCart, toggleCart,
  openMenu, closeMenu, toggleMenu,
  openMobileSearch, closeMobileSearch, toggleMobileSearch,
} = uiSlice.actions;

export const selectIsCartOpen = (state: RootState) => state.ui.isCartOpen;
export const selectIsMenuOpen = (state: RootState) => state.ui.isMenuOpen;
export const selectIsMobileSearchOpen = (state: RootState) => state.ui.isMobileSearchOpen;

export default uiSlice.reducer;
