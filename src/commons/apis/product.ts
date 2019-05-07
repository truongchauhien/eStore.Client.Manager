import requestApi from './apiRequest';
import {
    IProductListAction,
    IProductListSuccessAction,
    IProductCreateAction,
    IProductCreateSuccessAction,
    IProductUpdateAction,
    IProductUpdateSuccessAction,    
    IProductDeleteAction,
    IProductDeleteSuccessAction
} from '../../modules/manager/product/product-actions';

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

export async function listProductApiRequest(payload: IProductListAction['payload']): Promise<IProductListSuccessAction['payload']> {
    const response = await requestApi({
        method: 'GET',
        resource: '/product',
        params: {
            limit: String(payload.limit),
            offset: String(payload.offset)
        }
    });

    if (response.isOk && response.status === 200) {
        return response.body as IProductListSuccessAction['payload'];
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
