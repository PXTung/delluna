import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { CartContext } from "../../context/Cart";
import { ConstantContext } from "../../context/Constant";
import Loading from "../loading/Loading";

const Order = () => {
  const history = useHistory();
  const [order, setOrder] = useState();
  const constant = useContext(ConstantContext);
  const host = constant.host_api;
  const cartContext = useContext(CartContext);
  

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const order = cart.filter((item) => item.status === true);

    axios
      .post(host + "/order", JSON.stringify(order), {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => setOrder(res.data));
  }, [host]);

  const updateOrder = (product) => {
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.carts = order.carts.filter((cart) => cart.product.id !== product.id);
    setOrder(newOrder);
  };

  const saveOrder = () => {
    axios
      .post(host + "/order/save", JSON.stringify(order), {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast("ORDER SUCCESFULLY");
      })
      .catch((error) => {
        console.log(error);
        toast("ORDER ERROR");
      });
    cartContext.removeSelection();
    history.push("/");
  };

  if (order == null) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="visual"></div>
        <section className="order grid">
          <div className="order-title">DETAIL ORDER INFORMATION</div>
          <div className="order-product">
            <div className="order-product-title order-section-title">PRODUCTS</div>
            {order.carts.map((cart) => (
              <div className="order-product-item" key={cart.product.id}>
                <div className="order-product-item-info">
                  <div className="order-product-item-image">
                    <img src={cart.product.profilePicture} alt={cart.product.name} />
                  </div>
                  <div className="order-product-item-detail">
                    <div className="order-product-item-name">{cart.product.name}</div>
                    <div className="order-product-item-quantity">Quantity: {cart.quantity} product(s)</div>
                    <div className="order-product-item-total">Total: {cart.quantity * cart.product.price}</div>
                  </div>
                </div>
                <div className="order-product-remove">
                  <CartContext.Consumer>
                    {({ updateCart }) => (
                      <i
                        className="fas fa-trash-alt fa-lg"
                        onClick={() => {
                          updateCart(cart.product, cart.quantity, false);
                          updateOrder(cart.product);
                        }}
                      />
                    )}
                  </CartContext.Consumer>
                </div>
              </div>
            ))}
          </div>
          <div className="order-user">
            <div className="order-user-title order-section-title">DELIVERY INFROMATION</div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="order-user-name"
                id="name"
                placeholder="NAME"
                onChange={(e) => (order.name = e.target.value)}
                value={order.name || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="city">
                City
              </label>
              <input
                type="text"
                className="order-user-city"
                id="city"
                placeholder="NAME"
                onChange={(e) => (order.city = e.target.value)}
                value={order.city || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="district">
                District
              </label>
              <input
                type="text"
                className="order-user-district"
                id="district"
                placeholder="DISTRICT"
                onChange={(e) => (order.district = e.target.value)}
                value={order.district || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="subDistrict">
                Sub District
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="subDistrict"
                placeholder="SUB - DISTRICT"
                onChange={(e) => (order.subDistrict = e.target.value)}
                value={order.subDistrict || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="address"
                placeholder="Address"
                onChange={(e) => (order.address = e.target.value)}
                value={order.address || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="postalCode"
                placeholder="Postal Code"
                onChange={(e) => (order.postalCode = e.target.value)}
                value={order.postalCode || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="phone"
                placeholder="Phone"
                onChange={(e) => (order.phone = e.target.value)}
                value={order.phone || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="email"
                placeholder="Email"
                onChange={(e) => (order.email = e.target.value)}
                value={order.email || ""}
              />
            </div>
            <div className="order-user-field">
              <label className="order-user-label" htmlFor="note">
                Note
              </label>
              <input
                type="text"
                className="order-user-sub-district"
                id="note"
                placeholder="Note"
                onChange={(e) => (order.note = e.target.value)}
                value={order.note || ""}
              />
            </div>
          </div>
          <div className="order-discount">
            <div className="order-discount-title order-section-title">DISCOUNT CODE</div>
            <div className="order-discount-field">
              <label htmlFor="discountCode" className="order-discount-label">
                Discount Code
              </label>
              <input type="text" className="order-discount-code" id="discountCode" />
              <button className="order-discount-apply">APPLY</button>
            </div>
          </div>
          <div className="order-detail">
            <div className="order-detail-title order-section-title">ORDER DETAIL</div>
            <div className="order-detail-field">
              <label htmlFor="#" className="order-detail-label">
                Prices
              </label>
              <div className="order-detail-price">0</div>
            </div>
            <div className="order-detail-field">
              <label htmlFor="#" className="order-detail-label">
                Discount
              </label>
              <div className="order-detail-discount">0</div>
            </div>
            <div className="order-detail-field">
              <label htmlFor="#" className="order-detail-label">
                Delivery
              </label>
              <div className="order-detail-delivery">30000</div>
            </div>
            <div className="order-detail-field">
              <label htmlFor="#" className="order-detail-label">
                Total Payment
              </label>
              <CartContext.Consumer>
                {({ totalCart }) => <div className="order-detail-total">{totalCart.total + 30000}</div>}
              </CartContext.Consumer>
            </div>
          </div>
          <div className="order-confirm">
            <button className="order-confirm-order" onClick={() => saveOrder()}>
              ORDER
            </button>
          </div>
        </section>
      </>
    );
  }
};

export default Order;
