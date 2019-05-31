import requestApi from './commons/apiRequest';
import {
    IProductListAction,
    IProductListSuccessAction,
    IProductCreateAction,
    IProductCreateSuccessAction,
    IProductUpdateAction,
    IProductUpdateSuccessAction,
    IProductDeleteAction,
    IProductDeleteSuccessAction
} from '../../modules/product/product-actions';
import {
    IListProductRequestPayload,
    IListProductResponsePayload,
    IDetailProductRequestPayload,
    IDetailProductResponsePayload
} from '../types/apis/product';

export async function createProductApiRequest(payload: IProductCreateAction['payload']): Promise<IProductCreateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'POST',
        resource: '/product',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IProductCreateSuccessAction['payload'];
    }

    throw response;
}

export async function listProductApiRequest(payload: IListProductRequestPayload): Promise<IListProductResponsePayload> {
    const response = await requestApi({
        method: 'GET',
        resource: '/product',
        params: {
            name: payload.name,
            limit: payload.limit,
            offset: payload.offset
        }
    });

    if (response.isOk && response.status === 200) {
        return response.body as IProductListSuccessAction['payload'];
    }

    throw response;
}

export async function detailProductApiRequest(payload: IDetailProductRequestPayload): Promise<IDetailProductResponsePayload> {
    let response;
    if (payload.idType === '_id') {
        response = await requestApi({
            method: 'GET',
            resource: `/product/${payload._id}`,
            params: {
                type: payload.idType
            }
        });
    }

    if (payload.idType === 'upc') {
        response = await requestApi({
            method: 'GET',
            resource: `/product/${payload.upc}`,
            params: {
                type: payload.idType
            }
        });
    }

    if (response.isOk && response.status === 200) {
        return response.body as IDetailProductResponsePayload;
    }

    throw response;
}

export async function updateProductApiRequest(payload: IProductUpdateAction['payload']): Promise<IProductUpdateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'PUT',
        resource: `/product/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IProductUpdateSuccessAction['payload'];
    }

    throw response;
}

export async function deleteProductApiRequest(payload: IProductDeleteAction['payload']): Promise<IProductDeleteSuccessAction['payload']> {
    const response = await requestApi({
        method: 'DELETE',
        resource: `/product/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IProductDeleteSuccessAction['payload'];
    }

    throw response;
}
