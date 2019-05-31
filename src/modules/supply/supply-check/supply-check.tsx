import * as React from 'react';
import { ISupply } from "../../../commons/types/models/supply";
import { Table, Input, Button } from 'semantic-ui-react';
import { IProduct } from '../../../commons/types/models/product';
import { convertNumberToCurrency } from '../../../commons/utils/numberFormat';
import * as moment from 'moment';
import { listSupplyApiRequest, updateSupplyApiRequest } from '../../../commons/apis/supplyApi';

interface ISupplyCheckProps {

}

interface ISupplyCheckState {
    supplies: {
        total: number,
        data: Partial<ISupply>[]
    }
}

class SupplyCheck extends React.Component<ISupplyCheckProps, ISupplyCheckState> {
    constructor(props: ISupplyCheckProps) {
        super(props);

        this.state = {
            supplies: {
                total: 0,
                data: []
            }
        }
    }

    componentDidMount = async (): Promise<void> => {
        try {
            const responsePayload = await listSupplyApiRequest({ filter: 'approved' });
            this.setState({
                supplies: {
                    total: responsePayload.total,
                    data: responsePayload.data
                }
            });
        } catch (ex) {

        }
    }

    handleConfirmClick = async (id: string) => {
        try {
            let updatedSupply = this.state.supplies.data.find((supply) => supply._id === id);
            updatedSupply.isReceived = true;
            updatedSupply.receivedBy = localStorage.getItem('userId');
            await updateSupplyApiRequest(updatedSupply);
            let newSuppliesState: ISupplyCheckState['supplies'] = {
                total: this.state.supplies.total - 1,
                data: this.state.supplies.data.filter((supply) => supply._id !== id)
            }
            this.setState({
                supplies: newSuppliesState
            });
        } catch (ex) {

        }
    }

    render() {
        return (
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Sản phẩm</Table.HeaderCell>
                        <Table.HeaderCell>Số lượng</Table.HeaderCell>
                        <Table.HeaderCell>Số tiền thanh toán</Table.HeaderCell>
                        <Table.HeaderCell>Ngày giao hàng</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.supplies.data.map((supply, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{(supply.product as Partial<IProduct>).name}</Table.Cell>
                            <Table.Cell>{supply.quantity}</Table.Cell>
                            <Table.Cell>{supply.totalAmount && convertNumberToCurrency(supply.totalAmount)}</Table.Cell>
                            <Table.Cell>{supply.deliveryDate && moment(supply.deliveryDate).format('YYYY-MM-DD')}</Table.Cell>
                            <Table.Cell collapsing>
                                <Button onClick={() => this.handleConfirmClick(supply._id)}>Xác nhận</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default SupplyCheck;
