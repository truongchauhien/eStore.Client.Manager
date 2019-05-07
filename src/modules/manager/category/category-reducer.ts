import {
    TCategoryAction,
    CATEGORY_CREATE,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAILURE,
    CATEGORY_LIST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAILURE,
    CATEGORY_DELETE,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_UPDATE,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAILURE
} from './category-actions';

export interface ICategory {
    _id: string,
    name: string
}

export interface ICategoryState {
    isFetching: boolean,
    total: number,
    data: ICategory[]
}

const initState: ICategoryState = {
    isFetching: false,
    total: 0,
    data: []
}

export default function categoryReducer(state: ICategoryState = initState, action: TCategoryAction): ICategoryState {
    switch (action.type) {
        //#region CATGORY_CREATE
        case CATEGORY_CREATE:
            return state;
        case CATEGORY_CREATE_SUCCESS:
            return Object.assign({}, state, {
                total: state.total + 1,
                data: [...state.data, action.payload]
            });
        case CATEGORY_CREATE_FAILURE:
            return state;
        //#endregion
        //#region CATEGORY_LIST
        case CATEGORY_LIST:
            return state;
        case CATEGORY_LIST_SUCCESS:
            return Object.assign({}, state, {
                total: action.payload.total,
                data: action.payload.data
            });
        case CATEGORY_LIST_FAILURE:
            return state;
        //#endregion
        //#region CATEGORY_DELETE
        case CATEGORY_DELETE:
            return state;
        case CATEGORY_DELETE_SUCCESS:
            return Object.assign({}, state, {
                total: state.total - 1,
                data: state.data.filter((category, index) => category._id !== action.payload._id),
            });
        case CATEGORY_CREATE_FAILURE:
            return state;
        //#endregion
        //#region CATEGORY_UPDATE
        case CATEGORY_UPDATE:
            return state;
        case CATEGORY_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                data: state.data.map((value, index) => value._id === action.payload._id ? action.payload : value)
            });
        case CATEGORY_UPDATE_FAILURE:
            return state;
        //#endregion
        default:
            return state;
    }
}
