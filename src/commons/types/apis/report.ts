export interface IRevenueReportApiRequestPayload {
    fromDate: Date,
    toDate: Date
}

export interface IRevenueReportApiResponsePayload {
    revenue: number,
    orderCount: number
}
