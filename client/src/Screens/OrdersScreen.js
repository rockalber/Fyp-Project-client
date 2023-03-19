import { BarChartOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [dispatch,successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };
   return(
    <div>
   <h1>Order History</h1>
  {loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
            <td>
              {order.isDelivered
                ? order.deliveredAt.substring(0, 10)
                : 'No'}
            </td>
            <td>
             
                <BarChartOutlined style={{marginRight:10}}  onClick={() => {
                  props.history.push(`/order/${order._id}`);
                }} />
              <DeleteOutlined   onClick={() => deleteHandler(order)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
)
}
export default OrdersScreen;