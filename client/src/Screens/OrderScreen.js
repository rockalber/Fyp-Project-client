import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder, deliverOrder } from "../actions/orderActions";
import LoadingBox from "../component/LoadingBox";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import MessageBox from "../component/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

function OrderScreen(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const orderId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox varient="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              <strong>Name:</strong> {order.shipping.fullName} <br />
              <strong>Address: </strong> {order.shipping.address},
              {order.shipping.city},{order.shipping.postalCode},{" "}
              {order.shipping.country},
            </div>
            <br />
            <div>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              <strong>Payment Method:</strong> {order.payment.paymentMethod}
            </div>
            <br />
            <div>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3> Shopping Cart </h3>
                <div>Price</div>
              </li>
              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map((item) => (
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>
                        Qty: {item.qty} x ${item.price} = $
                        {item.qty * item.price}
                      </div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
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
              <div>${order.itemsPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>
                <strong>Order Total</strong>
              </div>
              <div>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </li>
            {!order.isPaid && (
              <li className="placeorder-actions-payment">
                {!sdkReady ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    {errorPay && (
                      <MessageBox variant="danger">{errorPay}</MessageBox>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                )}
              </li>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <li>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <button
                  type="button"
                  className="primary block"
                  onClick={deliverHandler}
                >
                  Deliver Order
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
