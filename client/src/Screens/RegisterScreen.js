import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [props.history,redirect,userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
         <div className='form-header'>
         <h2>Create Account</h2>
          <p>Please Register using account detail bellow.</p>
         </div>
        </li>
        <li>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox  variant="danger">{error}</MessageBox>}
        </li>
        <li>
       
          <input type="text" name="name" id="name" required placeholder="Enter Name.." onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
         
          <input type="email" name="email" id="email" required placeholder="Enter email.." onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <input type="password" id="password" name="password" required placeholder="Enter Password.." onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <input type="password" id="ConfirmPassword" name="ConfirmPassword" required placeholder="Enter Confrim Password.." onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button ">Register</button>
        </li>
        <div>
         <p> Already have an account?{' '}
         <t /> <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} >SignIn</Link></p>

        </div>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;