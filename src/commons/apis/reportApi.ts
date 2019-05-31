import requestApi from "./commons/apiRequest";
import {
    IRevenueReportApiRequestPayload,
    IRevenueReportApiResponsePayload
} from "../types/apis/report";

export const getRevenueReportApiRequest = async (payload: IRevenueReportApiRequestPayload): Promise<IRevenueReportApiResponsePayload> => {
    const response = await requestApi({
        method: 'GET',
        resource: '/report/revenue',
        params: {
            fromDate: payload.fromDate,
            toDate: payload.toDate
        }
    });

    if (response.isOk && response.status === 200) {
        return response.body as IRevenueReportApiResponsePayload;
    }

    throw response;
}
