import { IProduct } from "./product-reducer";
import { IApiResponse } from "../../../commons/apis/apiRequest";

//#region PRODUCT_CREATE
export const PRODUCT_CREATE = 'PRODUCT_CREATE';
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
export const PRODUCT_CREATE_FAILURE = 'PRODUCT_CREATE_FAILURE';

export interface IProductCreateAction {
    type: typeof PRODUCT_CREATE,
    payload: Partial<IProduct>
}

export const productCreateAction = (payload: IProductCreateAction['payload']): IProductCreateAction => {
    return {
        type: PRODUCT_CREATE,
        payload: payload
    };
}

export interface IProductCreateSuccessAction {
    type: typeof PRODUCT_CREATE_SUCCESS,
    payload: IProduct
}

export const productCreateSuccessAction = (payload: IProductCreateSuccessAction['payload']): IProductCreateSuccessAction => {
    return {
        type: PRODUCT_CREATE_SUCCESS,
        payload: payload
    };
}

export interface IProductCreateFailureAction {
    type: typeof PRODUCT_CREATE_FAILURE,
    payload: IApiResponse
}

export const productCreateFailureAction = (payload: IProductCreateFailureAction['payload']): IProductCreateFailureAction => {
    return {
        type: PRODUCT_CREATE_FAILURE,
        payload: payload
    };
}
//#endregion

//#region PRODUCT_LIST
export const PRODUCT_LIST = 'PRODUCT_LIST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE';

export interface IProductListAction {
    type: typeof PRODUCT_LIST,
    payload: {
        offset: number,
        limit: number
    }
}

export const productListAction = (payload?: IProductListAction['payload']): IProductListAction => {
    return {
        type: PRODUCT_LIST,
        payload: payload
    };
}

export interface IProductListSuccessAction {
    type: typeof PRODUCT_LIST_SUCCESS,
    payload: {
        total: number,
        offset: number,
        limit: number,
        data: IProduct[]
    }
}

export const productListSuccessAction = (payload: IProductListSuccessAction['payload']): IProductListSuccessAction => {
    return {
        type: PRODUCT_LIST_SUCCESS,
        payload: payload
    };
}

export interface IProductListFailureAction {
    type: typeof PRODUCT_LIST_FAILURE,
    payload: IApiResponse
}

export const productListFailureAction = (payload: IProductListFailureAction['payload']): IProductListFailureAction => {
    return {
        type: PRODUCT_LIST_FAILURE,
        payload: payload
    };
}
//#endregion

//#region PRODUCT_UPDATE
export const PRODUCT_UPDATE = 'PRODUCT_UPDATE';
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS';
export const PRODUCT_UPDATE_FAILURE = 'PRODUCT_UPDATE_FAILURE';

export interface IProductUpdateAction {
    type: typeof PRODUCT_UPDATE,
    payload: Partial<IProduct>
}

export const productUpdateAction = (payload: IProductUpdateAction['payload']): IProductUpdateAction => {
    return {
        type: PRODUCT_UPDATE,
        payload: payload
    }
}

export interface IProductUpdateSuccessAction {
    type: typeof PRODUCT_UPDATE_SUCCESS,
    payload: IProduct
}

export const productUpdateSuccessAction = (payload: IProductUpdateSuccessAction['payload']): IProductUpdateSuccessAction => {
    return {
        type: PRODUCT_UPDATE_SUCCESS,
        payload: payload
    }
}

export interface IProductUpdateFailureAction {
    type: typeof PRODUCT_UPDATE_FAILURE,
    payload: IApiResponse
}

export const productUpdateFailureAction = (payload: IProductUpdateFailureAction['payload']): IProductUpdateFailureAction => {
    return {
        type: PRODUCT_UPDATE_FAILURE,
        payload: payload
    }
}
//#endregion

//#region PRODUCT_DELETE
export const PRODUCT_DELETE = 'PRODUCT_DELETE';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_FAILURE = 'PRODUCT_DELETE_FAILURE';

export interface IProductDeleteAction {
    type: typeof PRODUCT_DELETE,
    payload: Pick<IProduct, '_id'>
}

export const productDeleteAction = (payload: IProductDeleteAction['payload']): IProductDeleteAction => {
    return {
        type: PRODUCT_DELETE,
        payload: payload
    }
}

export interface IProductDeleteSuccessAction {
    type: typeof PRODUCT_DELETE_SUCCESS,
    payload: Pick<IProduct, '_id'>
}

export const productDeleteSuccessAction = (payload?: IProductDeleteSuccessAction['payload']): IProductDeleteSuccessAction => {
    return {
        type: PRODUCT_DELETE_SUCCESS,
        payload: payload
    }
}

export interface IProductDeleteFailureAction {
    type: typeof PRODUCT_DELETE_FAILURE,
    payload: IApiResponse
}

export const productDeleteFailureAction = (payload?: IProductDeleteFailureAction['payload']): IProductDeleteFailureAction => {
    return {
        type: PRODUCT_DELETE_FAILURE,
        payload: payload
    }
}
//#endregion

export type TProductAction =
    IProductCreateAction | IProductCreateSuccessAction | IProductCreateFailureAction |
    IProductListAction | IProductListSuccessAction | IProductListFailureAction |
    IProductUpdateAction | IProductUpdateSuccessAction | IProductUpdateFailureAction |
    IProductDeleteAction | IProductDeleteSuccessAction | IProductDeleteFailureAction
    ;
