import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
    PRODUCT_CREATE,
    productCreateSuccessAction,
    productCreateFailureAction,
    PRODUCT_LIST,
    productListSuccessAction,
    productListFailureAction,
    PRODUCT_UPDATE,
    productUpdateFailureAction,
    productUpdateSuccessAction,
    PRODUCT_DELETE,
    productDeleteSuccessAction,
    productDeleteFailureAction,
} from './product-actions';
import {
    createProductApiRequest,
    listProductApiRequest,
    updateProductApiRequest,
    deleteProductApiRequest
} from '../../../commons/apis/productApi';

export const createProductEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === PRODUCT_CREATE),
        mergeMap((action: any) =>
            from(createProductApiRequest(action.payload))
                .pipe(
                    map(data => productCreateSuccessAction(data)),
                    catchError(data => of(productCreateFailureAction(data)))
                )
        )
    );
}

export const listProductEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === PRODUCT_LIST),
        mergeMap((action: any) =>
            from(listProductApiRequest(action.payload))
                .pipe(
                    map(data => productListSuccessAction(data)),
                    catchError(data => of(productListFailureAction(data)))
                )
        )
    );
}

export const updateProductEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === PRODUCT_UPDATE),
        mergeMap((action: any) =>
            from(updateProductApiRequest(action.payload))
                .pipe(
                    map(data => productUpdateSuccessAction(data)),
                    catchError(data => of(productUpdateFailureAction(data)))
                )
        )
    );
}

export const deleteProductEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === PRODUCT_DELETE),
        mergeMap((action: any) =>
            from(deleteProductApiRequest(action.payload))
                .pipe(
                    map(data => productDeleteSuccessAction(data)),
                    catchError(data => of(productDeleteFailureAction(data)))
                )
        )
    );
}
