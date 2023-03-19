import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

function UserListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
    return () => {
      //
    };
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete this user?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
                <td>{user.isAdmin ? 'YES' : 'No'}</td>
                <td>
                    <DeleteOutlined  onClick={() => deleteHandler(user)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default UserListScreen;