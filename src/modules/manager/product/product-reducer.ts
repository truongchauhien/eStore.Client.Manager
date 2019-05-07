import {
    PRODUCT_LIST,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_SUCCESS,
    TProductAction,
    PRODUCT_CREATE,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILURE,
    PRODUCT_UPDATE,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILURE,
    PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILURE
} from "./product-actions";

export interface IProduct {
    _id: string,
    name: string,
    upc: string,
    unit: string,
    price: number,
    quantity: number,
    category: string,
    distributor: string
}

export interface ProductState {
    total: number,
    offset: number,
    limit: number,
    isFetching: boolean,
    data: IProduct[]
}

const initProductState: ProductState = {
    total: 0,
    offset: 0,
    limit: 0,
    isFetching: false,
    data: []
}

export default function productReducer(state: ProductState = initProductState, action: TProductAction): ProductState {
    switch (action.type) {
        //#region PRODUCT_LIST
        case PRODUCT_LIST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case PRODUCT_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                total: action.payload.total,
                offset: action.payload.offset,
                limit: action.payload.limit,
                data: [...action.payload.data]
            });
        case PRODUCT_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        //#endregion
        //#region PRODUCT_CREATE
        case PRODUCT_CREATE:
            return state;
        case PRODUCT_CREATE_SUCCESS:
            return Object.assign({}, state, {
                total: state.total + 1,
                data: [action.payload, ...state.data]
            });
        case PRODUCT_CREATE_FAILURE:
            return state;
        //#endregion
        //#region PRODUCT_UPDATE
        case PRODUCT_UPDATE:
            return state;
        case PRODUCT_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                data: state.data.map((product, index) => product._id === action.payload._id ? action.payload : product)
            });
        case PRODUCT_UPDATE_FAILURE:
            return state;
        //#endregion
        //#region PRODUCT_DELETE:
        case PRODUCT_DELETE:
            return state;
        case PRODUCT_DELETE_SUCCESS:
            return Object.assign({}, state, {
                total: state.total - 1,
                data: state.data.filter((product, index) => product._id !== action.payload._id)
            })
        case PRODUCT_DELETE_FAILURE:
            return state;
        //#endregion
        default:
            return state;
    }
}
