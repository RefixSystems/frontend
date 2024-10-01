import { v4 as uuidv4 } from 'uuid';

const STATUS_SUCCESS = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_ERROR = 500;

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData));
};

const loadCartFromLocalStorage = () => {
  const storedCartData = localStorage.getItem('cart');
  return storedCartData ? JSON.parse(storedCartData) : [];
};

export const addItemToCart = (item) => {
  try {
    const cart = loadCartFromLocalStorage();
    const newItem = { ...item, _id: uuidv4() };
    const newCart = [...cart, newItem];
    saveCartToLocalStorage(newCart);
    return {
      status: STATUS_SUCCESS,
      message: 'Item added successfully',
      cart: newCart,
    };
  } catch (error) {
    return { status: STATUS_ERROR, message: 'Failed to add item', error };
  }
};

export const deleteItemFromCart = (itemId) => {
  try {
    const cart = loadCartFromLocalStorage();
    const updatedCart = cart.filter((item) => item._id !== itemId);
    saveCartToLocalStorage(updatedCart);
    return {
      status: STATUS_SUCCESS,
      message: 'Item removed successfully',
      cart: updatedCart,
    };
  } catch (error) {
    return { status: STATUS_ERROR, message: 'Failed to remove item', error };
  }
};

export const getAllItemsInCart = () => {
  try {
    const cart = loadCartFromLocalStorage();
    const length = cart ? cart.length : 0;
    return {
      status: STATUS_SUCCESS,
      message: 'Cart loaded successfully',
      cart,
      length,
    };
  } catch (error) {
    return { status: STATUS_ERROR, message: 'Failed to load cart', error };
  }
};
export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};
export const updateItemInCart = (itemId, quantity) => {
  try {
    const cart = loadCartFromLocalStorage();
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: quantity } : item
    );
    saveCartToLocalStorage(updatedCart);

    return {
      status: STATUS_SUCCESS,
      message: 'Item updated successfully',
      cart: updatedCart,
    };
  } catch (error) {
    return { status: STATUS_ERROR, message: 'Failed to update item', error };
  }
};
