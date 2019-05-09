import { IProduct } from "../models/product";

export interface IListProductRequestPayload {
    offset?: number,
    limit?: number,
    name?: string
}

export interface IListProductResponsePayload {
    total: number,
    offset: number,
    limit: number,
    data: IProduct[]
}

export interface IDetailProductRequestPayload {
    idType: '_id' | 'upc',
    _id?: string,
    upc?: string
}

export interface IDetailProductResponsePayload extends IProduct {
    
}
