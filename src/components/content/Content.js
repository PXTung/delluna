import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";
import Detail from "../product/ProductDetail";
import ProductType from "../product/ProductType";
import { useEffect } from "react";
import Error from "../error/Error";
import Cart from "../cart/Cart";
import Order from "../order/Order";
import Dashboard from "../dashboard/Dashboard";
import Register from "../register/Register";
import ListOrder from "../order/ListOrder";
import User from "../user/User";

const Content = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login*" component={Login} />
      <Route path="/member*" component={User} />
      <Route path="/register" component={Register} />
      <Route exact path="/product/:id" component={Detail} />
      <Route exact path="/product/type/:name" component={ProductType} />
      <Route path="/cart*" component={Cart} />
      <Route path="/order" component={Order} />
      <Route path="/list-order" component={ListOrder} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={Error} />
    </Switch>
  );
};

export default Content;
