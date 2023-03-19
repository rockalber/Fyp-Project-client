import React from "react";
import { Link, useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import Countdown from "./Timer";
import { Button, Divider, Dropdown, Image, Popover } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import MobileMenu from "./MobileMenu";
function Navigation() {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };
  const log = (e) => {
    console.log(e);
  };
  const currentDate = new Date();
  const year =
    currentDate.getMonth() === 11 && currentDate.getDate() > 23
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear();
  return (
    <div className="nav">
      <div className="offer-counter">
        <span>
          Get <b>25%</b> (ALMOST) OFF on All Products
          <Link to={'/product'}>
          <Button>Shop Now</Button>
          </Link>
        </span>
      </div>
      <div>
        <header className="desktop-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <div className="tit logo">
                <Link to="/">
                  <h1>360-Bazar</h1>
                </Link>
              </div>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <div className="bothAdmin">
                <div>
                  
                  {userInfo && userInfo.isAdmin==false ? (
                    <Popover
                      content={
                        <ul>
                           <h4>Account Info</h4>
                          <li>
                            <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/orderHistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="/signin" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>
                          <Divider/>
                        </ul>
                      }
                    >
                      <span type="primary">{userInfo.name}</span>
                    </Popover>
                  ) : (
                    <Link to="/signin" className={userInfo && userInfo.isAdmin===true ? "none" : "block"}>
                      <UserOutlined />{" "}
                    </Link>
                  )}
                </div>
                <div className="drop">
                  {userInfo && userInfo.isAdmin && (
                    <Popover
                      content={
                        <div>
                          <ul>
                            <h4>Product Info</h4>
                            <li>
                              <Link to="/products">Products</Link>
                            </li>
                            <li>
                              <Link to="/orders">Orders</Link>
                            </li>
                            <li>
                              <Link to="/userlist">Users</Link>
                            </li>
                           <div className="divider"></div>
                            <ul>
                            <h4>Account Info</h4>
                          <li>
                            <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/orderHistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="/signin" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>
                          <Divider/>
                        </ul>
                          </ul>
                          
                        </div>
                      }
                    >
                      <span type="primary">{userInfo.name}</span>
                    </Popover>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="cartli">
                <Link to="/cart">
                  <ShoppingCartOutlined />
                  {cartItem.length > 0 && (
                    <span className="badge">{cartItem.length}</span>
                  )}
                </Link>
              </div>
            </li>
          </ul>
        </header>

        <header className="mobile-header">
          <div className="logo">
            <Link to="/">
              <h1>360-Bazar</h1>
            </Link>
          </div>
          <div className="navmob">
            <ul>
              <li>
                <MobileMenu />
              </li>
              <li>
                <div className="cartli">
                  <Link to="/cart">
                    <ShoppingCartOutlined style={{ fontSize: 20 }} />
                    {cartItem.length > 0 && (
                      <span className="badge">{cartItem.length}</span>
                    )}
                  </Link>
                </div>
              </li>
              <li>
                {" "}
                <li>
                  <div className="bothAdmin">
                    <div>
                      {userInfo ? (
                        <Popover
                          content={
                            <ul>
                              <li>
                                <Link to="/profile">User Profile</Link>
                              </li>
                              <li>
                                <Link to="/orderHistory">Order History</Link>
                              </li>
                              <li>
                                <Link to="/signin" onClick={signoutHandler}>
                                  Sign Out
                                </Link>
                              </li>
                            </ul>
                          }
                        >
                          <span type="primary">{userInfo.name}</span>
                        </Popover>
                      ) : (
                        <Link to="/signin">
                          <UserOutlined style={{ fontSize: 20 }} />{" "}
                        </Link>
                      )}
                    </div>
                    <div className="drop">
                      {userInfo && userInfo.isAdmin && (
                        <Popover
                          content={
                            <div>
                              <ul>
                                <li>
                                  <Link to="/products">Products</Link>
                                </li>
                                <li>
                                  <Link to="/orders">Orders</Link>
                                </li>
                                <li>
                                  <Link to="/userlist">Users</Link>
                                </li>
                              </ul>
                            </div>
                          }
                        >
                          <span type="primary">{userInfo.name}</span>
                        </Popover>
                      )}
                    </div>
                  </div>
                </li>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navigation;
