import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  GitHub,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@material-ui/icons";
import { Image } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };
  return (
    <div>
      <footer className="footer-distributed">
        <div className="part footer-left">
          <div>
          <div className="tit logo">
                <Link to="/">
                  <h1>360-Bazar</h1>
                </Link>
              </div>
            <p>
              360-Bazar is intended to provide convenience to both sellers and customers with their
remarkable facilities. 360-bazar is providing a platform to sellers where people withsmall business can uplift their business through power of our store. Our focus is toprovide completely secure environment to our customers by providing features of
quality assurance and live complaint
            </p>
          </div>
        </div>
        <div className="part footer-middle">
          <ul>
            <h4>Quick Links</h4>
            <li>
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="part footer-center">
          <ul>
            <h4>Contact Us</h4>
            <li>
              <EnvironmentOutlined />
              <span>Rawalpindi, Lalazar</span>
              Rawalpindi - 47044
            </li>
            <li>
              <PhoneOutlined />
              <span>0123456789</span>
            </li>
            <li>
              <MailOutlined />
              <span>manahilrasheed00@gmail.com</span>
            </li>
          </ul>
        </div>
        <div className="part footer-right">
          <div className="footer-icons">
            <ul>
              <h4>Follow Us</h4>
              <li>
                {" "}
                <a href="#">
                  <Facebook />
                </a>
              </li>
              <li>
                {" "}
                <a href="#">
                  <Instagram />
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  <LinkedIn />
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="copyRight">
          <p className="footer-company-name">
            All Right Reservered © {new Date().getFullYear()} Shoe Point.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
