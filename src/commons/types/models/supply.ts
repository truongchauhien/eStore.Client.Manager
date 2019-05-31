import { IProduct } from "./product";
import { IEmployee } from "./employee";

export interface ISupply {
    _id: string,
    product: string | Partial<IProduct>,
    quantity: number,
    totalAmount: number,

    requestedBy: string | Partial<IEmployee>,
    requestedDate: Date,

    isApproved: boolean,
    approvedDate: Date,
    approvedBy: string | Partial<IEmployee>,

    deliveryDate: Date,

    isReceived: boolean,
    receivedDate: Date,
    receivedBy: string | Partial<IEmployee>
}
