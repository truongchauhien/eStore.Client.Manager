import { combineReducers } from 'redux';
import userReducer from './commons/user/user-reducer';
import productReducer from './modules/product/product-reducer';
import categoryReducer from './modules/category/category-reducer';
import distributorReducer from './modules/distributor/distributor-reducer';
import modalReducer from './modules/commons/modal/modal-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    distributors: distributorReducer,
    modal: modalReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
