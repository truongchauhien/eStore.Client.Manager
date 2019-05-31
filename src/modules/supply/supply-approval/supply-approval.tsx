import * as React from "react";
import { Table, Checkbox, Button, Icon, Input, Label } from "semantic-ui-react";
import { ISupply } from "../../../commons/types/models/supply";
import { IProduct } from "../../../commons/types/models/product";
import { listSupplyApiRequest, updateSupplyApiRequest, deleteSupplyApiRequest } from "../../../commons/apis/supplyApi";
import { convertNumberToCurrency } from "../../../commons/utils/numberFormat";
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface ISupplyApprovalProps {

}

interface ISupplyApprovalState {
    supplies: {
        total: number,
        data: Partial<ISupply>[]
    }
}

type ValueType = 'quantity' | 'totalAmount' | 'deliveryDate'

class SupplyApproval extends React.Component<ISupplyApprovalProps, ISupplyApprovalState> {
    constructor(props: ISupplyApprovalProps) {
        super(props);
        this.state = {
            supplies: {
                total: 0,
                data: []
            }
        };
    }

    componentDidMount = async (): Promise<void> => {
        try {
            const responsePayload = await listSupplyApiRequest({ filter: 'pending' });
            this.setState({
                supplies: {
                    total: responsePayload.total,
                    data: responsePayload.data
                }
            });
        } catch (ex) {

        }
    }

    handleValueChange = (id: string, valueType: ValueType, value: string): void => {
        let updatedSupply = this.state.supplies.data.find((supply) => supply._id === id);
        switch (valueType) {
            case 'quantity':
                updatedSupply.quantity = Number(value);
                break;
            case 'totalAmount':
                updatedSupply.totalAmount = Number(value);
                break;
            case 'deliveryDate':
                updatedSupply.deliveryDate = new Date(value)
                break;
            default:
                break;
        }

        let newSuppliesState: ISupplyApprovalState['supplies'] = {
            total: this.state.supplies.total,
            data: this.state.supplies.data.map((supply) => supply._id === id ? updatedSupply : supply)
        }

        console.log(newSuppliesState);
        this.setState({
            supplies: newSuppliesState
        });
    }

    handleApproveClick = async (id: string): Promise<void> => {
        try {
            let updatedSupply = this.state.supplies.data.find((supply) => supply._id === id);
            updatedSupply.isApproved = true;
            updatedSupply.approvedBy = localStorage.getItem('userId');
            await updateSupplyApiRequest(updatedSupply);
            let newSuppliesState: ISupplyApprovalState['supplies'] = {
                total: this.state.supplies.total - 1,
                data: this.state.supplies.data.filter((supply) => supply._id !== id)
            }
            this.setState({
                supplies: newSuppliesState
            });
        } catch (ex) {

        }
    }

    handleCancelClick = async (id: string): Promise<void> => {
        try {
            await deleteSupplyApiRequest({ _id: id });
            let newSuppliesState: ISupplyApprovalState['supplies'] = {
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
                            <Table.Cell>
                                <Input
                                    type="number"
                                    fluid
                                    labelPosition="right"
                                    onChange={(event, data) => this.handleValueChange(supply._id, 'quantity', data.value)}
                                >
                                    <input value={supply.quantity || 0} />
                                    <Label>{(supply.product as Partial<IProduct>).unit}</Label>
                                </Input>
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    type="number"
                                    fluid
                                    labelPosition="right"
                                    onChange={(event, data) => this.handleValueChange(supply._id, 'totalAmount', data.value)}
                                >
                                    <input value={supply.totalAmount || 0} />
                                    <Label>VNĐ</Label>
                                </Input>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <DatePicker
                                    selected={supply.deliveryDate}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText='Chọn ngày giao hàng ...'
                                    onChange={(data) => { this.handleValueChange(supply._id, 'deliveryDate', data.toJSON()) }}
                                />
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button.Group>
                                    <Button onClick={() => this.handleCancelClick(supply._id)}>Hủy</Button>
                                    <Button.Or text='-' />
                                    <Button positive onClick={() => this.handleApproveClick(supply._id)}>Duyệt</Button>
                                </Button.Group>
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
        )
    }
}

export default SupplyApproval;
