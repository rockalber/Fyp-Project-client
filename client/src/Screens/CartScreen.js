import { Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../component/MessageBox";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li keys={productId}>
            <h3>YOUR CART</h3>
            <div>Price</div>
          </li>
          {cartItem.length === 0 ? (
            <div className="empty" variant="danger">
              <p>
                {" "}
                Cart is empty{" "}
                <Link to="/product">
                  <span>Go Shopping</span>
                </Link>
              </p>
            </div>
          ) : (
            cartItem.map((item) => (
              <li className="productCart" key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.product} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="deletebtn">
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <Divider />
      <div className="cart-action">
        <p>
          Subtotal ( {cartItem.reduce((a, c) => a + c.qty, 0)} items): $
          {cartItem.reduce((a, c) => a + c.price * c.qty, 0)}
        </p>
        <div className="buttonProceed">
          <button
            type="button"
            onClick={checkoutHandler}
            className="text-right button primary full-width"
            disabled={cartItem.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
