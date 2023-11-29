import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/customers">
          <CustomersPage />
        </Route>
        <Route path="/orders">
        <OrderPage />
        </Route>
        <Route path="/products">
          <ProductPage />
        </Route>
       

         <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
