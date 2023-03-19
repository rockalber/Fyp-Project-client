import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [props.history, redirect, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
         <div className='form-header'>
         <h2>Login</h2>
          <p>Please login using account detail bellow.</p>
         </div>
        </li>
        <li>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </li>
        <li>
          <input type="email" name="email" required id="email" placeholder="Enter email.." onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <input type="password" id="password" required name="password" placeholder="Enter Password.." onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button ">Signin</button>
        </li>
        <div>
       <p>  <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} >Create account</Link></p>
        </div>
      </ul>
    </form>
  </div>
}
export default SigninScreen;