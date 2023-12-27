"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  addedState: {},
  stock: {},
  productCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Add the item to the cart and update session storage
      const updatedCart = [...state.cart, action.payload]
      sessionStorage.setItem('cart', JSON.stringify(updatedCart))
      return {
        ...state,
        cart: updatedCart,
        productCount: state.productCount + 1,
      }
    case 'REMOVE_FROM_CART':
      // Remove the item from the cart and session storage
      const updatedCartRemove = state.cart.filter(
        (item) => item !== action.payload
      )
      sessionStorage.setItem('cart', JSON.stringify(updatedCartRemove))
      // Also, update the addedState in session storage
      const updatedAddedState = { ...state.addedState }
      delete updatedAddedState[action.payload]
      sessionStorage.setItem('addedState', JSON.stringify(updatedAddedState))

      return {
        ...state,
        cart: updatedCartRemove,
        addedState: updatedAddedState,
        productCount: state.productCount - 1,
      }
    case 'CLEAR_CART':
      // Clear the cart and addedState
      sessionStorage.removeItem('cart')
      sessionStorage.removeItem('addedState')
      return {
        ...state,
        cart: [],
        addedState: {},
        productCount: 0,
      }
    case 'SET_ADDED':
      // Set the added state and update session storage
      const updatedAddedStateSet = {
        ...state.addedState,
        [action.payload]: true,
      }
      sessionStorage.setItem('addedState', JSON.stringify(updatedAddedStateSet))

      return {
        ...state,
        addedState: updatedAddedStateSet,
      }

    default:
      return state
  }
};

export function CartProvider({ children }) {
  let initialAddedCart;
  let initialAddedState;

  if (typeof window !== "undefined" && sessionStorage.getItem("cart")) {
    initialAddedCart = JSON.parse(sessionStorage.getItem("cart"));
    initialAddedState = JSON.parse(sessionStorage.getItem("addedState"));
  } else {
    initialAddedCart = [];
    initialAddedState = {};
  }
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    cart: initialAddedCart,
    addedState: initialAddedState,
  });

  const itemCount = state.cart.length;

  useEffect(() => {
    // Update session storage whenever the cart changes
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
    sessionStorage.setItem("addedState", JSON.stringify(state.addedState));
  }, [state.cart, state.addedState]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartDispatch: dispatch,
        addedState: state.addedState,
        itemCount,
        stock: state.stock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
