//react
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

//pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Registration from "./pages/registration/registration.component";
import CheckoutPage from "./pages/checkout/checkout.component";

//other libraries

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  //handling auth changes on firebase
  unsubscribeFromAuth = null;

  //persistence of user sessions/state changes
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  //closes subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          <Route path="/shop" component={ShopPage} />{" "}
          <Route exact path="/checkout" component={CheckoutPage} />{" "}
          <Route
            exact
            path="/registration"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Registration />
            }
          />{" "}
        </Switch>{" "}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
