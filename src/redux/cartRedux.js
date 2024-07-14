import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.variantId === newItem.variantId);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      } else {
        state.items.push({
          variantId: newItem.variantId,
          size: newItem.size,
          color: newItem.color,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          inStock: newItem.inStock,
          img: newItem.img,
          parentId: newItem._id,
          title: newItem.title,
          desc: newItem.desc,
          categories: newItem.categories,
        });
      }
      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.variantId === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.variantId !== id);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.variantId === id);
      if (existingItem) {
        state.totalPrice -= existingItem.totalPrice;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        state.totalPrice += existingItem.totalPrice;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
