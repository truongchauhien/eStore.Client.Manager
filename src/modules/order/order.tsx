import * as React from 'react';
import {
    Table, Label, Icon, Button, Input, Dropdown,
    DropdownOnSearchChangeData, InputOnChangeData, List, Ref, DropdownProps
} from 'semantic-ui-react';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators'
import { listProductApiRequest, detailProductApiRequest } from '../../commons/apis/productApi';
import { IOrder } from '../../commons/types/models/order';
import { convertNumberToCurrency } from '../../commons/utils/numberFormat';
import { createOrderApiRequest } from '../../commons/apis/orderApi';
import { IProduct } from '../../commons/types/models/product';
import ProductInput from '../commons/product-input/product-input';

interface IOrderProps {

}

interface IOrderState {
    order: IOrder
}

class Order extends React.Component<IOrderProps, IOrderState> {
    constructor(props: IOrderProps) {
        super(props);

        this.state = {
            order: {
                cashier: localStorage.getItem('userId'),
                totalAmount: 0,
                items: []
            }
        }
    }

    addItemIntoOrder = (product: Partial<IProduct>): void => {
        let newOrderState: IOrder = this.state.order;
        let isDuplicated = false;
        newOrderState.items = this.state.order.items.map((item, index) => {
            if (item.upc === product.upc) {
                isDuplicated = true;
                return Object.assign<Partial<typeof item>, typeof item, Partial<typeof item>>({}, item,
                    {
                        quantity: item.quantity + 1,
                        total: item.total + (item.price * 1)
                    }
                );
            } else {
                return item;
            }
        });

        if (!isDuplicated) {
            newOrderState.items = [...newOrderState.items, {
                name: product.name,
                upc: product.upc,
                price: product.price,
                unit: product.unit,
                quantity: 1,
                total: product.price
            }]
        }
        
        let newTotalAmount = 0;
        for (let item of newOrderState.items) {
            newTotalAmount += item.total;
        }
        newOrderState.totalAmount = newTotalAmount;

        this.setState({
            order: newOrderState
        });
    }

    handleCheckoutClick = async (): Promise<void> => {
        const { order } = this.state;
        if (!order.items.length) {
            return;
        }

        try {
            const responsePayload = await createOrderApiRequest(this.state.order);

            this.setState({
                order: Object.assign<Partial<IOrder>, IOrder, Partial<IOrder>>({}, this.state.order, { items: [], totalAmount: 0 })
            });
        } catch (ex) {

        }
    }

    handleDeleteItem = (index: number): void => {
        let newOrderState: IOrder = this.state.order;
        let deletedItem = this.state.order.items[index];

        newOrderState.items = this.state.order.items.filter((item, _index) => _index !== index);
        newOrderState.totalAmount -= deletedItem.total;

        this.setState({
            order: newOrderState
        });
    }

    handleChangeItemQuantity = (index: number, value: string): void => {
        const newQuantity = Number(value);
        if (!newQuantity) {
            return;
        }
        let newOrderState = this.state.order;

        newOrderState.items = this.state.order.items.map((item, _index) => _index !== index ? item : Object.assign({}, item, { quantity: newQuantity, total: item.price * newQuantity }));
        let newTotalAmount = 0;
        for (let item of newOrderState.items) {
            newTotalAmount += item.total;
        }
        newOrderState.totalAmount = newTotalAmount;

        this.setState({ order: newOrderState });
    }

    handleClearOrderClick = (): void => {
        this.setState({
            order: Object.assign<Partial<IOrder>, IOrder, Partial<IOrder>>({}, this.state.order, { items: [], totalAmount: 0 })
        });
    }

    render() {
        return (
            <div>
                <ProductInput onChooseProduct={this.addItemIntoOrder} />
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='1' />
                                <Table.HeaderCell>Sản phẩm</Table.HeaderCell>
                                <Table.HeaderCell>Đơn giá</Table.HeaderCell>
                                <Table.HeaderCell>Số lượng</Table.HeaderCell>
                                <Table.HeaderCell>Thành tiền</Table.HeaderCell>
                                <Table.HeaderCell width='1' />
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.order.items.map((item, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{convertNumberToCurrency(item.price)}</Table.Cell>
                                        <Table.Cell>
                                            <Input fluid type='number' min='1' label={item.unit} labelPosition='right' value={item.quantity} onChange={(event, data) => { this.handleChangeItemQuantity(index, data.value) }} />
                                        </Table.Cell>
                                        <Table.Cell>{convertNumberToCurrency(item.total)}</Table.Cell>
                                        <Table.Cell>
                                            <Button icon={{ name: 'delete', color: 'red' }} size='tiny' onClick={() => this.handleDeleteItem(index)} />
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Button icon labelPosition='left' primary size='medium' onClick={this.handleCheckoutClick}>
                                        <Icon name='cart' /> Thanh toán
                                    </Button>
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan='2' textAlign='center'>
                                    <Label size='big'>
                                        {convertNumberToCurrency(this.state.order.totalAmount)}
                                    </Label>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    {!!this.state.order.items.length && <Button icon={{ name: 'delete' }} color='red' size='tiny' onClick={this.handleClearOrderClick}></Button>}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Order;
