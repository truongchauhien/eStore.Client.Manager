import { IApiResponse } from "../../../commons/apis/commons/apiRequest";
import { NumericDictionary } from "lodash";
import { ICategory } from "../../../commons/types/models/category";

export const CATEGORY_CREATE = 'CATEGORY_CREATE';
export const CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS';
export const CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATE_FAILURE';

export interface ICategoryCreateAction {
    type: typeof CATEGORY_CREATE,
    payload: Partial<ICategory>
}

export const categoryCreateAction = (payload: ICategoryCreateAction['payload']): ICategoryCreateAction => {
    return {
        type: CATEGORY_CREATE,
        payload: payload
    };
}

export interface ICategoryCreateSuccessAction {
    type: typeof CATEGORY_CREATE_SUCCESS,
    payload: ICategory
}

export const categoryCreateSuccessAction = (payload: ICategoryCreateSuccessAction['payload']): ICategoryCreateSuccessAction => {
    return {
        type: CATEGORY_CREATE_SUCCESS,
        payload: payload
    };
}

export interface ICategoryCreateFailureAction {
    type: typeof CATEGORY_CREATE_FAILURE,
    payload: IApiResponse
}

export const categoryCreateFailureAction = (payload: ICategoryCreateFailureAction['payload']): ICategoryCreateFailureAction => {
    return {
        type: CATEGORY_CREATE_FAILURE,
        payload: payload
    };
}

export const CATEGORY_LIST = 'CATEGORY_LIST';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE';

export interface ICategoryListAction {
    type: typeof CATEGORY_LIST,
    payload: {

    }
}

export const categoryListAction = (payload?: ICategoryListAction['payload']): ICategoryListAction => {
    return {
        type: CATEGORY_LIST,
        payload: payload
    }
}

export interface ICategoryListSuccessAction {
    type: typeof CATEGORY_LIST_SUCCESS,
    payload: {
        total: number,
        data: ICategory[]
    }
}

export const categoryListSuccessAction = (payload: ICategoryListSuccessAction['payload']): ICategoryListSuccessAction => {
    return {
        type: CATEGORY_LIST_SUCCESS,
        payload: payload
    }
}

export interface ICategoryListFailureAction {
    type: typeof CATEGORY_LIST_FAILURE,
    payload: IApiResponse
}

export const categoryListFailureAction = (payload: ICategoryListFailureAction['payload']): ICategoryListFailureAction => {
    return {
        type: CATEGORY_LIST_FAILURE,
        payload: payload
    }
}

export const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE';

export interface ICategoryUpdateAction {
    type: typeof CATEGORY_UPDATE,
    payload: Partial<ICategory>
}

export const categoryUpdateAction = (payload: ICategoryUpdateAction['payload']): ICategoryUpdateAction => {
    return {
        type: CATEGORY_UPDATE,
        payload: payload
    }
}

export interface ICategoryUpdateSuccessAction {
    type: typeof CATEGORY_UPDATE_SUCCESS,
    payload: ICategory
}

export const categoryUpdateSuccessAction = (payload: ICategoryUpdateSuccessAction['payload']): ICategoryUpdateSuccessAction => {
    return {
        type: CATEGORY_UPDATE_SUCCESS,
        payload: payload
    }
}

export interface ICategoryUpdateFailureAction {
    type: typeof CATEGORY_UPDATE_FAILURE,
    payload: IApiResponse
}

export const categoryUpdateFailureAction = (payload: ICategoryUpdateFailureAction['payload']): ICategoryUpdateFailureAction => {
    return {
        type: CATEGORY_UPDATE_FAILURE,
        payload: payload
    }
}

export const CATEGORY_DELETE = 'CATEGORY_DELETE';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE';

export interface ICategoryDeleteAction {
    type: typeof CATEGORY_DELETE,
    payload: Pick<ICategory, '_id'>
}

export const categoryDeleteAction = (payload: ICategoryDeleteAction['payload']): ICategoryDeleteAction => {
    return {
        type: CATEGORY_DELETE,
        payload: payload
    }
}

export interface ICategoryDeleteSuccessAction {
    type: typeof CATEGORY_DELETE_SUCCESS,
    payload: Pick<ICategory, '_id'>
}

export const categoryDeleteSuccessAction = (payload?: ICategoryDeleteSuccessAction['payload']): ICategoryDeleteSuccessAction => {
    return {
        type: CATEGORY_DELETE_SUCCESS,
        payload: payload
    }
}

export interface ICategoryDeleteFailureAction {
    type: typeof CATEGORY_DELETE_FAILURE,
    payload: IApiResponse
}

export const categoryDeleteFailureAction = (payload?: ICategoryDeleteFailureAction['payload']): ICategoryDeleteFailureAction => {
    return {
        type: CATEGORY_DELETE_FAILURE,
        payload: payload
    }
}

export type TCategoryAction =
    ICategoryCreateAction | ICategoryCreateSuccessAction | ICategoryCreateFailureAction |
    ICategoryListAction | ICategoryListSuccessAction | ICategoryListFailureAction |
    ICategoryUpdateAction | ICategoryUpdateSuccessAction | ICategoryUpdateFailureAction |
    ICategoryDeleteAction | ICategoryDeleteSuccessAction | ICategoryDeleteFailureAction
    ;
