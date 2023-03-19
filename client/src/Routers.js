import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import Home from './Screens/Home';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import AdminRoute from './component/AdminRoute';
import SellerRoute from './component/SellerRoute';
import PrivateRoute from './component/PrivateRouter';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import About from './components/about';
import FAQs from './components/FAQPage';
import Contact from './components/Contact';


export const Routers = () => {
    return (
        <div >
            <Switch>
                <Route path="/orderHistory" component={OrderHistoryScreen} />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} className="homesc" />
                <Route path="/product" component={HomeScreen} />
                <Route path="/about" component={About}/>
                <Route path="/FAQs" component={FAQs}/>
                <Route path="/Contact" component={Contact}/> 

                <PrivateRoute
                    path="/profile"
                    component={ProfileScreen}
                ></PrivateRoute>
                <AdminRoute path="/userlist" component={UserListScreen} />
                <AdminRoute
                    path="/products"
                    component={ProductsScreen}
                ></AdminRoute>
                <AdminRoute
                    path="/orders"
                    component={OrdersScreen}
                ></AdminRoute>
                <Route path="/" exact={true} component={Home} />
                <SellerRoute path="/user/:id/edit" component={UserEditScreen} />
            </Switch>

        </div>
    );

}