import { IApiResponse } from "../../commons/apis/commons/apiRequest";
import { IDistributor } from "../../commons/types/models/distributor";

//#region DISTRIBUTOR_CREATE
export const DISTRIBUTOR_CREATE = 'DISTRIBUTOR_CREATE';
export const DISTRIBUTOR_CREATE_SUCCESS = 'DISTRIBUTOR_CREATE_SUCCESS';
export const DISTRIBUTOR_CREATE_FAILURE = 'DISTRIBUTOR_CREATE_FAILURE';

export interface IDistributorCreateAction {
    type: typeof DISTRIBUTOR_CREATE,
    payload: Partial<IDistributor>
}

export const distributorCreateAction = (payload: IDistributorCreateAction['payload']): IDistributorCreateAction => {
    return {
        type: DISTRIBUTOR_CREATE,
        payload: payload
    };
}

export interface IDistributorCreateSuccessAction {
    type: typeof DISTRIBUTOR_CREATE_SUCCESS,
    payload: IDistributor
}

export const distributorCreateSuccessAction = (payload: IDistributorCreateSuccessAction['payload']): IDistributorCreateSuccessAction => {
    return {
        type: DISTRIBUTOR_CREATE_SUCCESS,
        payload: payload
    };
}

export interface IDistributorCreateFailureAction {
    type: typeof DISTRIBUTOR_CREATE_FAILURE,
    payload: IApiResponse
}

export const distributorCreateFailureAction = (payload: IDistributorCreateFailureAction['payload']): IDistributorCreateFailureAction => {
    return {
        type: DISTRIBUTOR_CREATE_FAILURE,
        payload: payload
    };
}
//#endregion

//#region DISTRIBUTOR_LIST
export const DISTRIBUTOR_LIST = 'DISTRIBUTOR_LIST';
export const DISTRIBUTOR_LIST_SUCCESS = 'DISTRIBUTOR_LIST_SUCCESS';
export const DISTRIBUTOR_LIST_FAILURE = 'DISTRIBUTOR_LIST_FAILURE';

export interface IDistributorListAction {
    type: typeof DISTRIBUTOR_LIST,
    payload: {

    }
}

export const distributorListAction = (payload?: IDistributorListAction['payload']): IDistributorListAction => {
    return {
        type: DISTRIBUTOR_LIST,
        payload: payload
    };
}

export interface IDistributorListSuccessAction {
    type: typeof DISTRIBUTOR_LIST_SUCCESS,
    payload: {
        total: number,
        data: IDistributor[]
    }
}

export const distributorListSuccessAction = (payload: IDistributorListSuccessAction['payload']): IDistributorListSuccessAction => {
    return {
        type: DISTRIBUTOR_LIST_SUCCESS,
        payload: payload
    };
}

export interface IDistributorListFailureAction {
    type: typeof DISTRIBUTOR_LIST_FAILURE,
    payload: IApiResponse
}

export const distributorListFailureAction = (payload: IDistributorListFailureAction['payload']): IDistributorListFailureAction => {
    return {
        type: DISTRIBUTOR_LIST_FAILURE,
        payload: payload
    };
}
//#endregion

//#region DISTRIBUTOR_UPDATE
export const DISTRIBUTOR_UPDATE = 'DISTRIBUTOR_UPDATE';
export const DISTRIBUTOR_UPDATE_SUCCESS = 'DISTRIBUTOR_UPDATE_SUCCESS';
export const DISTRIBUTOR_UPDATE_FAILURE = 'DISTRIBUTOR_UPDATE_FAILURE';

export interface IDistributorUpdateAction {
    type: typeof DISTRIBUTOR_UPDATE,
    payload: Partial<IDistributor>
}

export const distributorUpdateAction = (payload: IDistributorUpdateAction['payload']): IDistributorUpdateAction => {
    return {
        type: DISTRIBUTOR_UPDATE,
        payload: payload
    }
}

export interface IDistributorUpdateSuccessAction {
    type: typeof DISTRIBUTOR_UPDATE_SUCCESS,
    payload: IDistributor
}

export const distributorUpdateSuccessAction = (payload: IDistributorUpdateSuccessAction['payload']): IDistributorUpdateSuccessAction => {
    return {
        type: DISTRIBUTOR_UPDATE_SUCCESS,
        payload: payload
    }
}

export interface IDistributorUpdateFailureAction {
    type: typeof DISTRIBUTOR_UPDATE_FAILURE,
    payload: IApiResponse
}

export const distributorUpdateFailureAction = (payload: IDistributorUpdateFailureAction['payload']): IDistributorUpdateFailureAction => {
    return {
        type: DISTRIBUTOR_UPDATE_FAILURE,
        payload: payload
    }
}
//#endregion

//#region DISTRIBUTOR_DELETE
export const DISTRIBUTOR_DELETE = 'DISTRIBUTOR_DELETE';
export const DISTRIBUTOR_DELETE_SUCCESS = 'DISTRIBUTOR_DELETE_SUCCESS';
export const DISTRIBUTOR_DELETE_FAILURE = 'DISTRIBUTOR_DELETE_FAILURE';

export interface IDistributorDeleteAction {
    type: typeof DISTRIBUTOR_DELETE,
    payload: Pick<IDistributor, '_id'>
}

export const distributorDeleteAction = (payload: IDistributorDeleteAction['payload']): IDistributorDeleteAction => {
    return {
        type: DISTRIBUTOR_DELETE,
        payload: payload
    }
}

export interface IDistributorDeleteSuccessAction {
    type: typeof DISTRIBUTOR_DELETE_SUCCESS,
    payload: Pick<IDistributor, '_id'>
}

export const distributorDeleteSuccessAction = (payload?: IDistributorDeleteSuccessAction['payload']): IDistributorDeleteSuccessAction => {
    return {
        type: DISTRIBUTOR_DELETE_SUCCESS,
        payload: payload
    }
}

export interface IDistributorDeleteFailureAction {
    type: typeof DISTRIBUTOR_DELETE_FAILURE,
    payload: IApiResponse
}

export const distributorDeleteFailureAction = (payload?: IDistributorDeleteFailureAction['payload']): IDistributorDeleteFailureAction => {
    return {
        type: DISTRIBUTOR_DELETE_FAILURE,
        payload: payload
    }
}
//#endregion

export type TDistributorAction =
    IDistributorCreateAction | IDistributorCreateSuccessAction | IDistributorCreateFailureAction |
    IDistributorListAction | IDistributorListSuccessAction | IDistributorListFailureAction |
    IDistributorUpdateAction | IDistributorUpdateSuccessAction | IDistributorUpdateFailureAction |
    IDistributorDeleteAction | IDistributorDeleteSuccessAction | IDistributorDeleteFailureAction
    ;
