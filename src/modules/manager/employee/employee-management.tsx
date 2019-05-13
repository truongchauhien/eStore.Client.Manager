import * as React from 'react';
import { Input, Select, Button, Table, Label, Menu, Icon, Pagination, PaginationProps, InputOnChangeData, DropdownProps } from 'semantic-ui-react';
import { IEmployee } from '../../../commons/types/models/employee';
import { listEmployeeApiRequest, updateEmployeeApiRequest, createEmployeeApiRequest, deleteEmployeeApiRequest } from '../../../commons/apis/employeeApi';
import * as styles from './styles.scss';
import DetailModal from '../commons/detail-modal';
import EmployeeDetail from './employee-detail/employee-detail';
import { convertNumberToCurrency } from '../../../commons/utils/numberFormat';

interface IEmployeeManagementProps {

}

interface IEmployeeManagementState {
    employees: {
        total: number,
        data: Partial<IEmployee>[]
    },
    searchType: 'name' | 'idNumber',
    searchInput: string,
    isAddEmployeeModalOpen: boolean,
    newEmployeeData: Partial<IEmployee>,
    selectedEmployeeId: string,
    isEditEmployeeModalOpen: boolean,
    editingEmployeeData: Partial<IEmployee>
}

const options = [
    { key: 'name', text: 'Tên', value: 'name' },
    { key: 'idNumber', text: 'Số CMND', value: 'idNumber' },
]

const ITEM_PER_PAGE = 5;

class EmployeeManagement extends React.Component<IEmployeeManagementProps, IEmployeeManagementState> {
    constructor(props: IEmployeeManagementProps) {
        super(props);

        this.state = {
            employees: {
                total: 0,
                data: []
            },
            searchType: 'name',
            searchInput: '',
            isAddEmployeeModalOpen: false,
            newEmployeeData: {},
            selectedEmployeeId: '',
            isEditEmployeeModalOpen: false,
            editingEmployeeData: {}
        };
    }

    componentDidMount = async () => {
        const responsePayload = await listEmployeeApiRequest({ offset: 0, limit: ITEM_PER_PAGE });
        this.setState({ employees: responsePayload });
    }

    handlePageChange = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps): Promise<void> => {
        try {
            const responsePayload = await listEmployeeApiRequest({
                idNumber: (this.state.searchType === 'idNumber') ?
                    (this.state.searchInput || undefined) : undefined,
                name: (this.state.searchType === 'name') ?
                    (this.state.searchInput || undefined) : undefined,
                limit: ITEM_PER_PAGE,
                offset: (data.activePage as number - 1) * ITEM_PER_PAGE
            });

            this.setState({
                employees: {
                    total: responsePayload.total,
                    data: [...responsePayload.data]
                }
            });
        } catch (ex) {

        }
    }

    handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        this.setState({
            searchInput: data.value
        });
    }

    handleSearchTypeChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps): void => {
        this.setState({
            searchType: data.value as any
        });
    }

    handleSearchClick = async (): Promise<void> => {
        try {
            const responsePayload = await listEmployeeApiRequest({
                idNumber: this.state.searchType === 'idNumber' ?
                    (this.state.searchInput || undefined) : undefined,
                name: this.state.searchType === 'name' ?
                    (this.state.searchInput || undefined) : undefined,
                offset: 0,
                limit: ITEM_PER_PAGE
            });

            this.setState({
                employees: {
                    total: responsePayload.total,
                    data: [...responsePayload.data]
                }
            });
        } catch (ex) {

        }
    }

    handleAddEmployeeClick = () => {
        this.setState({ isAddEmployeeModalOpen: true });
    }

    handleAddEmployeeModalClose = () => {
        this.setState({ isAddEmployeeModalOpen: false });
    }

    handleAddEmployeeModalYesClick = async (): Promise<void> => {
        this.setState({ isAddEmployeeModalOpen: false });
        try {
            const responsePayload = await createEmployeeApiRequest(this.state.newEmployeeData);
            let newEmployeesState = this.state.employees;
            newEmployeesState.total += 1;
            newEmployeesState.data = [...newEmployeesState.data, responsePayload]
            this.setState({
                employees: newEmployeesState
            });
        } catch (ex) {

        }
    }

    handleAddEmployeeModalNoClick = () => {
        this.handleAddEmployeeModalClose();
    }

    handleAddEmployeeModalDetailChange = (employee: Partial<IEmployee>): void => {
        this.setState({
            newEmployeeData: employee
        });
    }

    handleEditEmployeeClick = (id: string): void => {
        this.setState({
            selectedEmployeeId: id,
            isEditEmployeeModalOpen: true
        });
    }

    handleEditEmployeeModalDetailChange = (employee: Partial<IEmployee>): void => {
        this.setState({ editingEmployeeData: employee });
    }

    handleEditEmployeeModalClose = (): void => {
        this.setState({
            isEditEmployeeModalOpen: false
        });
    }

    handleEditEmployeeModalYesClick = async (): Promise<void> => {
        this.setState({
            isEditEmployeeModalOpen: false
        });

        try {
            const responsePayload = await updateEmployeeApiRequest(this.state.editingEmployeeData);
            this.setState({
                employees: Object.assign(
                    {},
                    this.state.employees,
                    {
                        data: this.state.employees.data.map((employee, index) =>
                            employee._id === responsePayload._id ? responsePayload : employee
                        )
                    }
                )
            });
        } catch (ex) {

        }
    }

    handleEditEmployeeModalNoClick = (): void => {
        this.handleEditEmployeeModalClose();
    }

    handleDeleteEmployeeClick = async (id: string): Promise<void> => {
        try {
            const responsePayload = await deleteEmployeeApiRequest({ _id: id });
            this.setState({
                employees: {
                    total: this.state.employees.total - 1,
                    data: this.state.employees.data.filter((employee, index) => employee._id !== id)
                }
            });
        } catch (ex) {

        }
    }

    render() {
        const totalPage = Math.ceil((this.state.employees.total / ITEM_PER_PAGE) || 1); // Do not show 0 page!

        return (
            <div>
                <div className={styles.toolbox}>
                    <div>
                        <Input type='text' placeholder='' action onChange={this.handleSearchInputChange}>
                            <Select options={options} defaultValue='name' onChange={this.handleSearchTypeChange} />
                            <input />
                            <Button type='submit' onClick={this.handleSearchClick}>Tìm ...</Button>
                        </Input>
                    </div>
                    <div className={styles.add}>
                        <Button primary className={styles.addButton} onClick={this.handleAddEmployeeClick}>Thêm ...</Button>
                        <DetailModal
                            open={this.state.isAddEmployeeModalOpen}
                            title='Thêm nhân viên'
                            icon='add'
                            onClose={this.handleAddEmployeeModalClose}
                            onYesClick={this.handleAddEmployeeModalYesClick}
                            onNoClick={this.handleAddEmployeeModalNoClick}
                        >
                            <EmployeeDetail onChange={this.handleAddEmployeeModalDetailChange} />
                        </DetailModal>
                    </div>
                </div>

                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Họ và Tên</Table.HeaderCell>
                                <Table.HeaderCell>Vị trí</Table.HeaderCell>
                                <Table.HeaderCell>Mức lương</Table.HeaderCell>
                                <Table.HeaderCell width='3'><Icon name='settings' /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.employees.data.map((employee, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{employee.fullName}</Table.Cell>
                                    <Table.Cell>{employee.position}</Table.Cell>
                                    <Table.Cell>{convertNumberToCurrency(employee.salary)}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon='edit' basic
                                            onClick={() => { this.handleEditEmployeeClick(employee._id) }}
                                        />
                                        <Button basic
                                            onClick={() => { this.handleDeleteEmployeeClick(employee._id) }}
                                        >
                                            <Icon name='delete' fitted color='red' />
                                        </Button>

                                        <DetailModal
                                            open={this.state.isEditEmployeeModalOpen}
                                            title='Thêm nhân viên'
                                            icon='add'
                                            onClose={this.handleEditEmployeeModalClose}
                                            onYesClick={this.handleEditEmployeeModalYesClick}
                                            onNoClick={this.handleEditEmployeeModalNoClick}
                                        >
                                            <EmployeeDetail onChange={this.handleEditEmployeeModalDetailChange} employee={this.state.employees.data.find(employee => employee._id === this.state.selectedEmployeeId)} />
                                        </DetailModal>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Pagination floated='right' defaultActivePage={5} totalPages={totalPage} onPageChange={this.handlePageChange} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </div>
        );
    }
}

export default EmployeeManagement;
