import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import producttypeReducer from "./producttypeReducer";
import brandReducer from "./brandReducer";
import bannerReducer from "./bannerReducer";
import productReducer from "./productReducer";
import billReducer from "./billReducer";
import cartReducer from "./cartReducer";
import cartdetailReducer from "./cartdetailReducer";
import stateReducer from "./stateReducer";
import invoicedetailReducer from "./invoicedetailReducer";
import categoryReducer from "./categoryReducer";
import currencyReducer from "./currencyReducer";
import paypalReducer from "./paypalReducer";


import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const customerPersistConfig = {
    ...persistCommonConfig,
    key: 'customer',
    whitelist: ['isCustomerLoggedIn', 'customerInfo']
};

// const customerPersistConfig = {
//     ...persistCommonConfig,
//     key: 'localCart',
//     whitelist: ['isCustomerLoggedIn', 'customerInfo']
// };

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    customer: persistReducer(customerPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    producttype: producttypeReducer,
    brand: brandReducer,
    banner: bannerReducer,
    product: productReducer,
    category: categoryReducer,
    bill: billReducer,
    cart: cartReducer,
    cartdetail: cartdetailReducer,
    state: stateReducer,
    invoicedetail: invoicedetailReducer,
    currency: currencyReducer,
    paypal: paypalReducer,
})