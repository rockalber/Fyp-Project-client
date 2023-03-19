import { AlignLeftOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AlignLeftOutlined style={{fontSize:20}} onClick={showDrawer}/>
      <Drawer placement="right" onClose={onClose} open={open}>
      <div className="tit logo"><Link to="/">
         <h1>360-Bazar</h1>
            </Link>
            <ul>
            <li>
            <Link to="/" >
                Home
                </Link>
            </li>
            <li>
              <Link to="/product" >
                Products
                </Link>
            </li>
            <li>
              <Link to="/about">
                About Us
                </Link>
            </li>
    
            <li>
              <Link to="/faqs">
                FAQs
                </Link>
            </li>
            <li>
              <Link to="/contact">
                Contact Us
                </Link>
            </li>
          </ul>
           </div>
     
      </Drawer>
    </>
  );
};
export default MobileMenu;