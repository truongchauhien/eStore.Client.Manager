import { IEmployee } from "../models/employee";

export interface IListEmployeeApiRequestPayload {
    name?: string,
    idNumber?: string,
    offset: number,
    limit: number
}

export interface IListEmployeeApiResponsePayload {
    total: number,
    data: Partial<IEmployee>[]
}

export interface ICreateEmployeeApiRequestPayload extends Partial<IEmployee> {

}

export interface ICreateEmployeeApiResponsePayload extends Partial<IEmployee> {

}

export interface IDeleteEmployeeApiRequestPayload {
    _id: string
}

export interface IDeleteEmployeeApiResponsePayload extends Partial<IEmployee> {

}

export interface IUpdateEmployeeApiRequestPayload extends Partial<IEmployee> {

}

export interface IUpdateEmployeeApiResponsePayload extends Partial<IEmployee> {

}
