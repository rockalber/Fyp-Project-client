import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../component/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { CART_EMPTY } from '../constants/cartConstants';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, error, success, order } = orderCreate;

  const { cartItem, shipping, payment } = cart;
  if (!shipping) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice=(num)=>Number(num.toFixed(2))
  const itemsPrice = cartItem.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice =toPrice(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({...cart,
      orderItems: cartItem, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  
  }
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET});
      dispatch({type: CART_EMPTY});
    }

  },[dispatch,props.history,success,order]);
  
  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
          <strong>Name:</strong> {cart.shipping.fullName} <br />
                <strong>Address: </strong> {cart.shipping.address},
           {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
          <strong>Payment Method:</strong> {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li >
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItem.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItem.map(item =>
                  <li key={item.product}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
         
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice.toFixed(2)}</div>
          </li>
          <li>
            <div><strong>Order Total</strong> </div>
            <div><strong>${totalPrice.toFixed(2)}</strong> </div>
          </li>
           <li>
            <button className="button primary full-width" onClick={placeOrderHandler} 
            disabled={cartItem.length === 0}
            >Place Order</button>
          </li>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox varient="danger">{error}</MessageBox>}
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;