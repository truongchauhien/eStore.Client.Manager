import { combineEpics } from 'redux-observable';
import { userLoginRequestEpic } from './commons/user/user-epics';
import { productListEpic } from './modules/manager/product/product-epics';
import {
    listCategoryEpic,
    createCategoryEpic,
    updateCategoryEpic,
    deleteCategoryEpic
} from './modules/manager/category/category-epics';

export default combineEpics(
    userLoginRequestEpic,
    productListEpic,
    listCategoryEpic,
    createCategoryEpic,
    updateCategoryEpic,
    deleteCategoryEpic
);
