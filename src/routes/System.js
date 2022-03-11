import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import ProductTypeManage from '../containers/System/ProductTypeManage';
import CategoryManage from '../containers/System/CategoryManage';
import BillManage from '../containers/System/BillManage';
import BrandManage from '../containers/System/BrandManage';
import BannerManage from '../containers/System/BannerManage';
import Statistic from '../containers/System/Statistic';
import Header from '../containers/Header/Header';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/product-manage" component={ProductManage} />
                            <Route path="/system/product-type-manage" component={ProductTypeManage} />
                            <Route path="/system/category-manage" component={CategoryManage} />
                            <Route path="/system/bill-manage" component={BillManage} />
                            <Route path="/system/brand-manage" component={BrandManage} />
                            <Route path="/system/banner-manage" component={BannerManage} />
                            <Route path="/system/statistic" component={Statistic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
