import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const getTotalCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let status = true;
    let total = 0;
    for (const item of cart) {
      if (item.status) {
        total += item.product.price * item.quantity;
      } else {
        status = false;
      }
    }

    return { status: status, total: total };
  };

  const [totalCart, setTotalCart] = useState(getTotalCart);

  const isExistItem = (product, quantity, status) => {
    let check = false;
    let newCart = cart;

    for (let item of cart) {
      if (parseInt(item.product.id) === parseInt(product.id)) {
        check = true;
        item.quantity = quantity;
        item.status = status;
        toast(<a href="/cart">YOUR CART IS UPDATED</a>);
      }
    }

    if (!check) {
      if (cart.length !== 0) {
        newCart = [...cart, { product, quantity, status }];
      } else {
        newCart = [{ product, quantity, status }];
      }
      toast(<a href="/cart">ADD PRODUCT TO CART SUCCESSFUL</a>);
    }

    return newCart;
  };

  const updateTotalCart = () => {
    const total = getTotalCart();

    setTotalCart(total);
  };

  const setTotalCartStatus = (status) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
      newCart.push({
        product: cart[i].product,
        quantity: parseInt(cart[i].quantity),
        status: status,
      });
    }

    updateCartAndStorage(newCart);
  };

  const updateCartAndStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateTotalCart();
  };

  const addToCart = (product, quantity, status) => {
    const newCart = isExistItem(product, parseInt(quantity), status);
    updateCartAndStorage(newCart);
  };

  const updateCart = (product, quantity, status) => {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id !== product.id) {
        newCart.push(cart[i]);
      } else {
        newCart.push({
          product: product,
          quantity: parseInt(quantity),
          status: status,
        });
      }
    }

    updateCartAndStorage(newCart);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.product.id !== product.id);
    updateCartAndStorage(newCart);
  };

  const removeSelection = () => {
    const newCart = cart.filter((item) => item.status === false);
    updateCartAndStorage(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        totalCart: totalCart,
        addToCart: addToCart,
        updateCart: updateCart,
        removeFromCart: removeFromCart,
        updateTotalCart: updateTotalCart,
        setTotalCartStatus: setTotalCartStatus,
        removeSelection: removeSelection,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
