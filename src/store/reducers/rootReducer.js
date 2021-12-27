import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import producttypeReducer from "./producttypeReducer";
import brandReducer from "./brandReducer";
import bannerReducer from "./bannerReducer";
import productReducer from "./productReducer";
import billReducer from "./billReducer";
import stateReducer from "./stateReducer";
import invoicedetailReducer from "./invoicedetailReducer";
import categoryReducer from "./categoryReducer";


import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    producttype: producttypeReducer,
    brand: brandReducer,
    banner: bannerReducer,
    product: productReducer,
    category: categoryReducer,
    bill: billReducer,
    state: stateReducer,
    invoicedetail: invoicedetailReducer,
})