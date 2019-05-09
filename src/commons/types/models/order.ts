export interface IOrder {
    cashier: string,
    totalAmount: number,
    items: {
        name: string,
        upc: string,
        price: number,
        unit: string,
        quantity: number,
        total: number
    }[]
}
