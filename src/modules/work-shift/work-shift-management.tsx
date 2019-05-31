import * as React from 'react';
import { Table, Label, Dropdown, Input, Icon, Button, InputOnChangeData, ButtonProps, Pagination, PaginationProps, Select, DropdownProps } from 'semantic-ui-react';
import { IEmployee } from '../../commons/types/models/employee';
import { listEmployeeApiRequest, updateEmployeeApiRequest } from '../../commons/apis/employeeApi';
import * as _ from 'lodash';
import * as styles from './styles.scss';

interface IWorkShiftManagementProps {

}

interface IWorkShiftManagementState {
    employees: {
        total: number,
        data: Partial<IEmployee>[]
    },
    searchType: 'name' | 'idNumber',
    searchInput: string,
}

const ITEM_PER_PAGE = 5;

const workShiftOptions = [
    { key: 1, text: '', value: '' }
]

const searchOptions = [
    { key: 'name', text: 'Tên', value: 'name' },
    { key: 'idNumber', text: 'Số CMND', value: 'idNumber' },
]

class WorkShiftManagement extends React.Component<IWorkShiftManagementProps, IWorkShiftManagementState> {
    constructor(props: IWorkShiftManagementProps) {
        super(props);

        this.state = {
            employees: {
                total: 0,
                data: []
            },
            searchType: 'name',
            searchInput: '',
        }
    }

    componentDidMount = async (): Promise<void> => {
        try {
            const responsePayload = await listEmployeeApiRequest({ limit: ITEM_PER_PAGE, offset: 0 });
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

    handleWorkShiftChange = async (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): Promise<void> => {
        const { employeeId, dayOfWeek, type } = data.meta;
        let newEmployeesState = Object.assign({}, this.state.employees, {
            data: this.state.employees.data.map((employee, index) => {
                if (employee._id === employeeId) {
                    _.set(employee, `workShifts.${dayOfWeek}.${type}`, data.value);
                }
                return employee;
            })
        });

        try {
            const responsePayload = await updateEmployeeApiRequest({
                _id: employeeId,
                workShifts: newEmployeesState.data.find((employee, index) => employee._id === employeeId).workShifts
            });

            this.setState({
                employees: newEmployeesState
            });
        } catch (ex) {

        }
    }

    handleCsvGenerateClick = async () => {
        const generateRow = (data: string[]): string => {
            let convertedData = data.map((item) => `"${item}"`);
            return convertedData.join(';');
        }

        const generateWorkShiftString = (data: any): string => {
            return `${_.get(data, 'start', '')}\n${_.get(data, 'end', '')}`;
        }

        let contentRows: string[] = [];
        contentRows.push(generateRow([
            'Họ và Tên',
            'Thứ Hai', 'Thứ Ba',
            'Thứ Tư', 'Thứ Năm',
            'Thứ Sáu', 'Thứ Bảy',
            'Chủ Nhật'
        ]));

        try {
            const responsePayload = await listEmployeeApiRequest({ offset: 0, limit: this.state.employees.total });

            for (const employee of responsePayload.data) {
                contentRows.push(generateRow([
                    employee.fullName,
                    generateWorkShiftString(employee.workShifts.monday),
                    generateWorkShiftString(employee.workShifts.tuesday),
                    generateWorkShiftString(employee.workShifts.wednesday),
                    generateWorkShiftString(employee.workShifts.thursday),
                    generateWorkShiftString(employee.workShifts.friday),
                    generateWorkShiftString(employee.workShifts.saturday),
                    generateWorkShiftString(employee.workShifts.sunday)
                ]));
            }

            const csvContent = contentRows.join('\n');
            const csvFile = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8' });

            let csvDownloadLink = document.createElement('a');
            csvDownloadLink.setAttribute('href', URL.createObjectURL(csvFile));
            csvDownloadLink.setAttribute('download', 'Ca làm việc.csv');
            document.body.appendChild(csvDownloadLink);
            csvDownloadLink.click();
            document.body.removeChild(csvDownloadLink);
        } catch (ex) {

        }
    }

    render() {
        const totalPage = Math.ceil((this.state.employees.total / ITEM_PER_PAGE) || 1);

        return (
            <div>
                <div className={styles.toolbox}>
                    <div className={styles.downloadCsv} >
                        <Button
                            primary
                            className={styles.downloadCsvButton}
                            onClick={this.handleCsvGenerateClick}>Tải về file CSV
                        </Button>
                    </div>

                    <div>
                        <Input type='text' placeholder='' action onChange={this.handleSearchInputChange}>
                            <Select options={searchOptions} defaultValue='name' onChange={this.handleSearchTypeChange} />
                            <input />
                            <Button type='submit' onClick={this.handleSearchClick}>Tìm ...</Button>
                        </Input>
                    </div>
                </div>

                <div>
                    <Table celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='2'>Tên nhân viên</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 2</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 3</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 4</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 5</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 6</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Thứ 7</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Chủ Nhật</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.employees.data.map((employee, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{employee.fullName}</Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'monday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.monday.start', '')}
                                            type='time'
                                            fluid
                                        />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'monday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.monday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'tuesday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.tuesday.start', '')}
                                            type='time'
                                            fluid
                                        />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'tuesday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.tuesday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'wednesday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.wednesday.start', '')}
                                            type='time'
                                            fluid
                                        />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'wednesday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.wednesday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'thursday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.thursday.start', '')}
                                            type='time'
                                            fluid />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'thursday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.thursday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'friday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.friday.start', '')}
                                            type='time'
                                            fluid />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'friday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.friday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'saturday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.saturday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'saturday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.saturday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'sunday', type: 'start' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.sunday.start', '')}
                                            type='time'
                                            fluid
                                        />
                                        <Input
                                            meta={{ employeeId: employee._id, dayOfWeek: 'sunday', type: 'end' }}
                                            onChange={this.handleWorkShiftChange}
                                            value={_.get(employee, 'workShifts.sunday.end', '')}
                                            type='time'
                                            fluid
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='8'>
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

export default WorkShiftManagement;
