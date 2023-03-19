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
              We are a team of designers and developers that create high quality
              wordpress, shopify, Opencart
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
              <span>Daska, Sialkot</span>
              Daska - 51010
            </li>
            <li>
              <PhoneOutlined />
              <span>0123456789</span>
            </li>
            <li>
              <MailOutlined />
              <span>test@test.com</span>
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
