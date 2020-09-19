import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

class App extends Component {

  componentDidMount(){
    this.props.onAuthCheckState();
  }

  render () {
    
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/orders' component={asyncOrders} />
            <Route path='/auth' component={asyncAuth} />
            <Route path='/logout' component={asyncLogout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
