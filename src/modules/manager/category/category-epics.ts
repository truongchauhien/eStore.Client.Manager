import {
    CATEGORY_CREATE,
    categoryCreateSuccessAction,
    categoryCreateFailureAction,
    CATEGORY_LIST,
    categoryListSuccessAction,
    categoryListFailureAction,
    CATEGORY_DELETE,
    CATEGORY_UPDATE,
    categoryUpdateSuccessAction,
    categoryUpdateFailureAction,
    categoryDeleteSuccessAction,
    categoryDeleteFailureAction
} from './category-actions';
import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
    createCategoryApiRequest,
    listCategoryApiRequest,
    updateCategoryApiRequest,
    deleteCategoryApiRequest
} from '../../../commons/apis/categoryApi';

export const createCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === CATEGORY_CREATE),
        mergeMap((action: any) =>
            from(createCategoryApiRequest(action.payload))
                .pipe(
                    map(data => categoryCreateSuccessAction(data)),
                    catchError(data => of(categoryCreateFailureAction(data)))
                )
        )
    );
}

export const listCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === CATEGORY_LIST),
        mergeMap((action: any) =>
            from(listCategoryApiRequest(action.payload))
                .pipe(
                    map(data => categoryListSuccessAction(data)),
                    catchError(data => of(categoryListFailureAction(data)))
                )
        )
    );
}

export const updateCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === CATEGORY_UPDATE),
        mergeMap((action: any) =>
            from(updateCategoryApiRequest(action.payload))
                .pipe(
                    map(data => categoryUpdateSuccessAction(data)),
                    catchError(data => of(categoryUpdateFailureAction(data)))
                )
        )
    );
}

export const deleteCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === CATEGORY_DELETE),
        mergeMap((action: any) =>
            from(deleteCategoryApiRequest(action.payload))
                .pipe(
                    map(data => categoryDeleteSuccessAction(data)),
                    catchError(data => of(categoryDeleteFailureAction(data)))
                )
        )
    );
}
