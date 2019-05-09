import { ICreateOrderRequestPayload, ICreateOrderResponsePayload } from "../types/apis/order";
import requestApi from "./apiRequest";

export const createOrderApiRequest = async (payload: ICreateOrderRequestPayload): Promise<ICreateOrderResponsePayload> => {
    const response = await requestApi({
        method: 'POST',
        resource: '/order',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as ICreateOrderResponsePayload;
    }

    throw response;
}
