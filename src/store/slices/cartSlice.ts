import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  customization?: {
    logoUrl?: string;
    text?: string;
    position?: string;
  };
}

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = 'crosswild-cart';

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  if (items.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: (): CartState => ({ items: loadFromStorage() }),
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
      saveToStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) item.quantity = quantity;
      }
      saveToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
