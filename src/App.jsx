import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./components/Layout.css";
import Home from "./components/Home";
import Header from "./components/Header";
import OrderSummary from "./components/OrderSummary";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import FormPage from "./components/FormPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
          <Footer menuTitle="Sıccacık Menu" />
        </Route>
        <Route path="/siparisFormu">
          <FormPage />
          <Footer menuTitle="Hot Menu" /> 
        </Route>
        <Route path="/siparisOzeti" component={OrderSummary} />
        <Route path="/errorPage" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
