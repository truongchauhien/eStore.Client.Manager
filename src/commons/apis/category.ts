import requestApi from './apiRequest';
import {
    ICategoryCreateAction,
    ICategoryCreateSuccessAction,
    ICategoryListAction,
    ICategoryListSuccessAction,
    ICategoryUpdateAction,
    ICategoryUpdateSuccessAction,
    ICategoryDeleteSuccessAction,
    ICategoryDeleteAction
} from '../../modules/manager/category/category-actions';

export async function createCategoryApiRequest(payload: ICategoryCreateAction['payload']): Promise<ICategoryCreateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'POST',
        resource: '/category',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICategoryCreateSuccessAction['payload'];
    }

    throw response;
}

export async function listCategoryApiRequest(payload: ICategoryListAction['payload']): Promise<ICategoryListSuccessAction['payload']> {
    const response = await requestApi({
        method: 'GET',
        resource: '/category'
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICategoryListSuccessAction['payload'];
    }

    throw response;
}

export async function updateCategoryApiRequest(payload: ICategoryUpdateAction['payload']): Promise<ICategoryUpdateSuccessAction['payload']> {
    const response = await requestApi({
        method: 'PUT',
        resource: `/category/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICategoryUpdateSuccessAction['payload'];
    }

    throw response;
}

export async function deleteCategoryApiRequest(payload: ICategoryDeleteAction['payload']): Promise<ICategoryDeleteSuccessAction['payload']> {
    const response = await requestApi({
        method: 'DELETE',
        resource: `/category/${payload._id}`
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICategoryDeleteSuccessAction['payload'];
    }

    throw response;
}
