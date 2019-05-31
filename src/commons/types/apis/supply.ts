import { ISupply } from "../models/supply";

export interface ICreateSupplyApiRequestPayload extends Partial<ISupply> {

}

export interface ICreateSupplyApiResponsePayload extends Partial<ISupply> {

}

export interface IListSupplyApiRequestPayload {
    filter: 'pending' | 'approved' | 'received'
}

export interface IListSupplyApiResponsePayload {
    total: number,
    data: Partial<ISupply>[]
}

export interface IUpdateSupplyApiRequestPayload extends Partial<ISupply> {

}

export interface IUpdateSupplyApiResponsePayload extends Partial<ISupply> {

}

export interface IDeleteSupplyApiRequestPayload {
    _id: string
}

export interface IDeleteSupplyApiResponsePayload extends Partial<ISupply> {

}
