import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { DISTRIBUTOR_CREATE, DISTRIBUTOR_LIST, DISTRIBUTOR_UPDATE, DISTRIBUTOR_DELETE, distributorCreateSuccessAction, distributorCreateFailureAction, distributorListSuccessAction, distributorListFailureAction, distributorUpdateSuccessAction, distributorUpdateFailureAction, distributorDeleteSuccessAction, distributorDeleteFailureAction } from './distributor-actions';
import { createDistributorApiRequest, listDistributorApiRequest, updateDistributorApiRequest, deleteDistributorApiRequest } from '../../commons/apis/distributorApi';

export const createDistributorEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === DISTRIBUTOR_CREATE),
        mergeMap((action: any) =>
            from(createDistributorApiRequest(action.payload))
                .pipe(
                    map(data => distributorCreateSuccessAction(data)),
                    catchError(data => of(distributorCreateFailureAction(data)))
                )
        )
    );
}

export const listDistributorEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === DISTRIBUTOR_LIST),
        mergeMap((action: any) =>
            from(listDistributorApiRequest(action.payload))
                .pipe(
                    map(data => distributorListSuccessAction(data)),
                    catchError(data => of(distributorListFailureAction(data)))
                )
        )
    );
}

export const updateDistributorEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === DISTRIBUTOR_UPDATE),
        mergeMap((action: any) =>
            from(updateDistributorApiRequest(action.payload))
                .pipe(
                    map(data => distributorUpdateSuccessAction(data)),
                    catchError(data => of(distributorUpdateFailureAction(data)))
                )
        )
    );
}

export const deleteDistributorEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type === DISTRIBUTOR_DELETE),
        mergeMap((action: any) =>
            from(deleteDistributorApiRequest(action.payload))
                .pipe(
                    map(data => distributorDeleteSuccessAction(data)),
                    catchError(data => of(distributorDeleteFailureAction(data)))
                )
        )
    );
}
