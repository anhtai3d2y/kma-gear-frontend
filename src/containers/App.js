import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from "../components/CustomScrollbars";
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import { Redirect } from 'react-router-dom';

import Home from '../routes/Home';
import Login from './Auth/Login';
import HomePage from './HomePage/HomePage.js';
import System from '../routes/System';
import ProductPage from './ProductPage/ProductPage.js';
import ListProductPage from './ProductPage/ListProductPage.js';
import CartPage from './CartPage/CartPage.js';
import CheckoutPage from './CartPage/CheckoutPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import RegisterPage from './LoginPage/RegisterPage.js';
import InfoCustomerPage from './LoginPage/InfoCustomerPage.js';
import ErrorPage from './ErrorPage/ErrorPage.js';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{
                                height: '100vh',
                                width: '100%'
                            }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                    <Route path={path.ADMIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.PRODUCT} component={(ProductPage)} />
                                    <Route path={path.LIST_PRODUCT} component={(ListProductPage)} />
                                    <Route path={path.CART} component={(CartPage)} />
                                    <Route path={path.CHECKOUT} component={(CheckoutPage)} />
                                    <Route path={path.LOGIN} component={(LoginPage)} />
                                    <Route path={path.REGISTER} component={(RegisterPage)} />
                                    <Route path={path.ACCOUNT} component={(InfoCustomerPage)} />
                                    <Route path='/404' component={ErrorPage} />
                                    <Redirect from='*' to='/404' />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            limit={4}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);