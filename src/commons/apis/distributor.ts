import requestApi from './commons/apiRequest';
import {
    IDistributorCreateAction,
    IDistributorCreateSuccessAction,
    IDistributorListAction,
    IDistributorListSuccessAction,
    IDistributorUpdateAction,
    IDistributorUpdateSuccessAction,
    IDistributorDeleteSuccessAction,
    IDistributorDeleteAction
} from '../../modules/manager/distributor/distributor-actions';

export async function createDistributorApiRequest(payload: IDistributorCreateAction['payload']): Promise<IDistributorCreateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'POST',
        resource: '/distributor',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDistributorCreateSuccessAction['payload'];
    }

    throw response;
}

export async function listDistributorApiRequest(payload: IDistributorListAction['payload']): Promise<IDistributorListSuccessAction['payload']> {
    const response = await requestApi({
        method: 'GET',
        resource: '/distributor'
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDistributorListSuccessAction['payload'];
    }

    throw response;
}

export async function updateDistributorApiRequest(payload: IDistributorUpdateAction['payload']): Promise<IDistributorUpdateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'PUT',
        resource: `/distributor/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDistributorUpdateSuccessAction['payload'];
    }

    throw response;
}

export async function deleteDistributorApiRequest(payload: IDistributorDeleteAction['payload']): Promise<IDistributorDeleteSuccessAction['payload']> {
    const response = await requestApi({
        method: 'DELETE',
        resource: `/distributor/${payload._id}`
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDistributorDeleteSuccessAction['payload'];
    }

    throw response;
}
