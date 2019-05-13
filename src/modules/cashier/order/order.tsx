import * as React from 'react';
import { Table, Label, Menu, Icon, Button, Form, Input, Dropdown, Select, DropdownOnSearchChangeData, Modal, Header, InputOnChangeData } from 'semantic-ui-react';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators'
import { listProductApiRequest, detailProductApiRequest } from '../../../commons/apis/productApi';
import { IOrder } from '../../../commons/types/models/order';
import { convertNumberToCurrency } from '../../../commons/utils/numberFormat';
import { createOrderApiRequest } from '../../../commons/apis/orderApi';

const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'articles', text: 'Articles', value: 'articles' },
    { key: 'products', text: 'Products', value: 'products' },
]

interface IOrderProps {

}

interface IOrderState {
    isShowSearchProductSelected: boolean,
    searchProductOptions: {
        key: string,
        value: string,
        text: string
    }[],
    order: IOrder,
    upcInputValue: string,
    isFetchingProduct: boolean,
    hasErrorWhenGetProduct: boolean
}

class Order extends React.Component<IOrderProps, IOrderState> {
    private searchSubject: Subject<string>
    private searchSubscription: Subscription

    constructor(props: IOrderProps) {
        super(props);

        this.state = {
            isShowSearchProductSelected: false,
            searchProductOptions: [],
            order: {
                cashier: localStorage.getItem('userId'),
                totalAmount: 0,
                items: []
            },
            upcInputValue: '',
            isFetchingProduct: false,
            hasErrorWhenGetProduct: false
        }
    }

    componentDidMount() {
        this.searchSubject = new Subject<string>();
        this.searchSubscription = this.searchSubject.pipe(
            debounceTime(500),
        ).subscribe(async (searchQuery) => {
            const responsePayload = await listProductApiRequest({ name: searchQuery });
            let newSearchProductOptions = responsePayload.data.map((product, index) => ({
                key: product._id,
                value: product._id,
                text: product.name
            }));

            this.setState({
                searchProductOptions: newSearchProductOptions
            });
        })
    }

    componentWillUnmount() {
        this.searchSubscription.unsubscribe();
    }

    handleSearchChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData): void => {
        this.searchSubject.next(data.searchQuery);
    }

    switchToSearchProduct = () => {
        this.setState({
            isShowSearchProductSelected: !this.state.isShowSearchProductSelected
        });
    }

    handleAddProduct = async (): Promise<void> => {
        const { upcInputValue } = this.state;
        if (!upcInputValue) {
            return;
        }

        this.setState({
            isFetchingProduct: true
        });


        try {
            let responsePayload = await detailProductApiRequest({ idType: "upc", upc: upcInputValue });

            let newOrderState: IOrder = this.state.order;
            let isDuplicated = false;
            newOrderState.items = this.state.order.items.map((item, index) => {
                if (item.upc === responsePayload.upc) {
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
                    name: responsePayload.name,
                    upc: responsePayload.upc,
                    price: responsePayload.price,
                    unit: responsePayload.unit,
                    quantity: 1,
                    total: responsePayload.price
                }]
            }

            let newTotalAmount = 0;
            for (let item of newOrderState.items) {
                newTotalAmount += item.total;
            }
            newOrderState.totalAmount = newTotalAmount;

            this.setState({
                upcInputValue: '',
                order: newOrderState
            });
        } catch (ex) {
            this.setState({
                hasErrorWhenGetProduct: true
            });
            return;
        } finally {
            this.setState({
                isFetchingProduct: false
            });
        }
    }

    handleUpcInputValueChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        this.setState({
            upcInputValue: data.value,
            hasErrorWhenGetProduct: false
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
        const { searchProductOptions, isShowSearchProductSelected, upcInputValue } = this.state;
        return (
            <div>
                <div>
                    <Button onClick={this.switchToSearchProduct}>{isShowSearchProductSelected ? 'Quay lại' : 'Tìm sản phẩm ...'}</Button>
                    {isShowSearchProductSelected ?
                        <Dropdown
                            selection
                            options={searchProductOptions}
                            clearable
                            search
                            noResultsMessage='Không tìm thấy sản phẩm ...'
                            onSearchChange={this.handleSearchChange}
                        />
                        :
                        <Input
                            icon='barcode' iconPosition='left'
                            value={upcInputValue}
                            onChange={this.handleUpcInputValueChange}
                            action={
                                {
                                    disabled: this.state.isFetchingProduct,
                                    icon: 'add',
                                    onClick: this.handleAddProduct
                                }
                            }
                            placeholder='Mã vạch của sản phẩm ...'
                            loading={this.state.isFetchingProduct}
                            error={this.state.hasErrorWhenGetProduct}
                        />
                    }
                </div>

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
                                        <Table.Cell><Input type='number' min='1' label={item.unit} labelPosition='right' fluid value={item.quantity} onChange={(event, data) => { this.handleChangeItemQuantity(index, data.value) }} /></Table.Cell>
                                        <Table.Cell>{convertNumberToCurrency(item.total)}</Table.Cell>
                                        <Table.Cell textAlign='center'>
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
