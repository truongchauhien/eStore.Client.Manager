import { combineEpics } from 'redux-observable';
import { userLoginRequestEpic } from './commons/user/user-epics';
import {
    createProductEpic,
    listProductEpic,
    updateProductEpic,
    deleteProductEpic
} from './modules/manager/product/product-epics';
import {
    listCategoryEpic,
    createCategoryEpic,
    updateCategoryEpic,
    deleteCategoryEpic
} from './modules/manager/category/category-epics';
import {
    listDistributorEpic,
    createDistributorEpic,
    updateDistributorEpic,
    deleteDistributorEpic
} from './modules/manager/distributor/distributor-epics';

export default combineEpics(
    userLoginRequestEpic,

    createProductEpic,
    listProductEpic,
    updateProductEpic,
    deleteProductEpic,

    listCategoryEpic,
    createCategoryEpic,
    updateCategoryEpic,
    deleteCategoryEpic,

    listDistributorEpic,
    createDistributorEpic,
    updateDistributorEpic,
    deleteDistributorEpic
);
