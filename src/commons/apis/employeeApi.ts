import {
    IListEmployeeApiRequestPayload,
    IListEmployeeApiResponsePayload,
    ICreateEmployeeApiRequestPayload,
    ICreateEmployeeApiResponsePayload,
    IDeleteEmployeeApiRequestPayload,
    IDeleteEmployeeApiResponsePayload,
    IUpdateEmployeeApiRequestPayload,
    IUpdateEmployeeApiResponsePayload
} from "../types/apis/employee";
import requestApi from "./commons/apiRequest";

export const listEmployeeApiRequest = async (payload: IListEmployeeApiRequestPayload): Promise<IListEmployeeApiResponsePayload> => {
    const response = await requestApi({
        method: 'GET',
        resource: '/employee',
        params: {
            name: payload.name,
            idNumber: payload.idNumber,
            limit: payload.limit,
            offset: payload.offset
        }
    });
    
    if (response.isOk && response.status === 200) {
        return response.body as IListEmployeeApiResponsePayload;
    }

    throw response;
}

export const createEmployeeApiRequest = async (payload: ICreateEmployeeApiRequestPayload): Promise<ICreateEmployeeApiResponsePayload> => {
    const response = await requestApi({
        method: 'POST',
        resource: '/employee',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICreateEmployeeApiResponsePayload;
    }

    throw response;
}

export const updateEmployeeApiRequest = async (payload: IUpdateEmployeeApiRequestPayload): Promise<IUpdateEmployeeApiResponsePayload> => {
    const response = await requestApi({
        method: 'PUT',
        resource: `/employee/${payload._id}`,
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IUpdateEmployeeApiResponsePayload;
    }

    throw response;
}

export const deleteEmployeeApiRequest = async (payload: IDeleteEmployeeApiRequestPayload): Promise<IDeleteEmployeeApiResponsePayload> => {
    const response = await requestApi({
        method: 'DELETE',
        resource: `/employee/${payload._id}`
    });

    if (response.isOk && response.status === 200) {
        return response.body as IDeleteEmployeeApiResponsePayload;
    }

    throw response;
}
