import {
    TDistributorAction,
    DISTRIBUTOR_CREATE,
    DISTRIBUTOR_CREATE_SUCCESS,
    DISTRIBUTOR_CREATE_FAILURE,
    DISTRIBUTOR_LIST,
    DISTRIBUTOR_LIST_SUCCESS,
    DISTRIBUTOR_LIST_FAILURE,
    DISTRIBUTOR_UPDATE,
    DISTRIBUTOR_UPDATE_SUCCESS,
    DISTRIBUTOR_UPDATE_FAILURE,
    DISTRIBUTOR_DELETE,
    DISTRIBUTOR_DELETE_SUCCESS,
    DISTRIBUTOR_DELETE_FAILURE
} from "./distributor-actions";
import { IDistributor } from "../../commons/types/models/distributor";

export interface IDistributorState {
    isFetching: boolean,
    total: number,
    data: IDistributor[]
}

const initState: IDistributorState = {
    isFetching: false,
    total: 0,
    data: []
}

export default function distributorReducer(state: IDistributorState = initState, action: TDistributorAction): IDistributorState {
    switch (action.type) {
        //#region DISTRIBUTOR_CREATE
        case DISTRIBUTOR_CREATE:
            return state;
        case DISTRIBUTOR_CREATE_SUCCESS:
            return Object.assign({}, state,
                {
                    total: state.total = 1,
                    data: [...state.data, action.payload]
                }
            );
        case DISTRIBUTOR_CREATE_FAILURE:
            return state;
        //#endregion
        //#region DISTRIBUTOR_LIST
        case DISTRIBUTOR_LIST:
            return state;
        case DISTRIBUTOR_LIST_SUCCESS:
            return Object.assign({}, state, {
                total: action.payload.total,
                data: action.payload.data
            });
        case DISTRIBUTOR_LIST_FAILURE:
            return state;
        //#endregion
        //#region DISTRIBUTOR_UPDATE
        case DISTRIBUTOR_UPDATE:
            return state;
        case DISTRIBUTOR_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                data: state.data.map((value, index) => value._id === action.payload._id ? action.payload : value)
            });
        case DISTRIBUTOR_UPDATE_FAILURE:
            return state;
        //#endregion
        //#region DISTRIBUTOR_DELETE
        case DISTRIBUTOR_DELETE:
            return state;
        case DISTRIBUTOR_DELETE_SUCCESS:
            return Object.assign({}, state, {
                total: state.total - 1,
                data: state.data.filter((category, index) => category._id !== action.payload._id),
            });
        case DISTRIBUTOR_DELETE_FAILURE:
            return state;
        //#endregion
        default:
            return state
    }
}
