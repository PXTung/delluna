import { useEffect } from "react";
import { useHistory } from "react-router";
import { CartContext } from "../../context/Cart";

const CartItem = (props) => {
  const item = props.item;

  return (
    <div className="table-item row">
      <div className="table-item-check col-s1">
        <CartContext.Consumer>
          {({ updateCart }) => (
            <input
              type="checkbox"
              className="table-item-checkbox checkbox"
              onChange={(e) => updateCart(item.product, item.quantity, e.target.checked)}
              checked={item.status}
            />
          )}
        </CartContext.Consumer>
      </div>
      <div className="table-item-image col-s2">
        <img src={item.product.profilePicture} alt="#" />
      </div>
      <div className="table-item-name col-s7">
        <div>{item.product.name}</div>
      </div>
      <div className="table-item-price col-s2">{item.product.price}</div>
      <div className="table-item-quantity col-s2">
        <CartContext.Consumer>
          {({ updateCart }) => (
            <input
              className="detail-content-quantity"
              type="number"
              min="1"
              pattern="^[0-9]"
              onChange={(e) => {
                if (e.target.validity.valid && e.target.value !== "") {
                  updateCart(item.product, e.target.value, item.status);
                } else {
                  updateCart(item.product, 1, item.status);
                }
              }}
              value={item.quantity}
            />
          )}
        </CartContext.Consumer>
      </div>
      <div className="table-item-score col-s2">0</div>
      <div className="table-item-total col-s2">{item.quantity * item.product.price}</div>
      <div className="table-item-action col-s2">
        <button className="table-item-like">LIKE</button>
        <CartContext.Consumer>
          {({ removeFromCart }) => (
            <button className="table-item-remove" onClick={() => removeFromCart(item.product)}>
              REMOVE
            </button>
          )}
        </CartContext.Consumer>
      </div>
    </div>
  );
};

const Cart = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="visual"></div>
      <section className="cart grid">
        <div className="cart-title">SELECT PRODUCT IN YOUR CART</div>
        <div className="cart-benifit">
          <div className="cart-benifit-title">BENIFIT</div>
          <div className="cart-benifit-item">
            <div className="cart-benifit-label">AWARD SCORE</div>
            <CartContext.Consumer>
              {({ cart }) => <div className="cart-benifit-score">{cart.length}</div>}
            </CartContext.Consumer>
          </div>
          <div className="cart-benifit-item">
            <div className="cart-benifit-label">DISCOUNT CODE</div>
            <div className="cart-benifit-discount">0</div>
          </div>
        </div>
        <div className="cart-current">
          <div className="cart-current-label">PRODUCT</div>
          <div className="cart-current-item">0</div>
        </div>
        <div className="cart-list table">
          <div className="table-header row">
            <div className="table-header-check col-s1">
              <CartContext.Consumer>
                {({ totalCart, setTotalCartStatus }) => (
                  <input
                    type="checkbox"
                    className="table-header-check-all checkbox"
                    onChange={(e) => setTotalCartStatus(e.target.checked)}
                    checked={totalCart.status}
                  />
                )}
              </CartContext.Consumer>
            </div>
            <div className="table-header-image col-s2">IMAGE</div>
            <div className="table-header-name col-s7">PRODUCT</div>
            <div className="table-header-price col-s2">PRICE</div>
            <div className="table-header-quantity col-s2">QUANTITY</div>
            <div className="table-header-score col-s2">SCORE</div>
            <div className="table-header-total col-s2">TOTAL</div>
            <div className="table-header-action col-s2">ACTION</div>
          </div>
          <CartContext.Consumer>
            {({ cart }) => cart.map((item) => <CartItem key={item.product.id} item={item} />)}
          </CartContext.Consumer>
          <div className="table-footer">
            <div className="col-s3"></div>
            <div className="table-footer-label col-s7">TOTAL PAYMENT</div>
            <CartContext.Consumer>
              {({ totalCart }) => <div className="table-footer-total col-s10">{totalCart.total}</div>}
            </CartContext.Consumer>
          </div>
        </div>
        <div className="cart-action">
          <button className="cart-action-order" onClick={() => history.push("/order")}>
            ORDER
          </button>
          <button className="cart-action-like">LIKE</button>
          <CartContext.Consumer>
            {({ removeSelection }) => (
              <button className="cart-action-remove" onClick={() => removeSelection()}>
                REMOVE
              </button>
            )}
          </CartContext.Consumer>
          <button className="cart-action-back">BACK</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
