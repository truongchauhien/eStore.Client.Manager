import { combineReducers } from 'redux';
import userReducer from './commons/user/user-reducer';
import productReducer from './modules/manager/product/product-reducer';
import categoryReducer from './modules/manager/category/category-reducer';
import distributorReducer from './modules/manager/distributor/distributor-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    distributors: distributorReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
