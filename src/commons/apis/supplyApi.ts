import requestApi from "./commons/apiRequest";
import {
    ICreateSupplyApiRequestPayload,
    ICreateSupplyApiResponsePayload,
    IListSupplyApiRequestPayload,
    IListSupplyApiResponsePayload,
    IUpdateSupplyApiRequestPayload,
    IUpdateSupplyApiResponsePayload,
    IDeleteSupplyApiRequestPayload,
    IDeleteSupplyApiResponsePayload
} from "../types/apis/supply";

export const createSupplyApiRequest = async (payload: ICreateSupplyApiRequestPayload): Promise<ICreateSupplyApiResponsePayload> => {
    const response = await requestApi({
        method: 'POST',
        resource: '/supply',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICreateSupplyApiResponsePayload;
    }

    throw response;
}

export const listSupplyApiRequest = async (payload: IListSupplyApiRequestPayload): Promise<IListSupplyApiResponsePayload> => {
    const response = await requestApi({
        method: 'GET',
        resource: '/supply',
        params: {
            filter: payload.filter
        }
    });

    if (response.isOk && response.status === 200) {
        return response.body as IListSupplyApiResponsePayload;
    }

    throw response;
}

export const updateSupplyApiRequest = async (payload: IUpdateSupplyApiRequestPayload): Promise<IUpdateSupplyApiResponsePayload> => {
    const response = await requestApi({
        method: 'PUT',
        resource: `/supply/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IUpdateSupplyApiResponsePayload;
    }

    throw response;
}

export const deleteSupplyApiRequest = async (payload: IDeleteSupplyApiRequestPayload): Promise<IDeleteSupplyApiResponsePayload> => {
    const response = await requestApi({
        method: 'DELETE',
        resource: `/supply/${payload._id}`
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDeleteSupplyApiResponsePayload;
    }

    throw response;
}
