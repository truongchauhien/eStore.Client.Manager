import * as React from 'react';
import { Form, Input, Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { IEmployee } from '../../../commons/types/models/employee';

interface IEmployeeDetailProps {
    employee?: Partial<IEmployee>
    onChange: (worker: Partial<IEmployee>) => void
}

interface IEmployeeDetailState {
    employee: Partial<IEmployee>
}

type ValueType =
    'userName' | 'password' | 'fullName' | 
    'idNumber' | 'salary' | 'address' | 
    'roles' | 'position' | 'phoneNumber';

const permissionOptions: DropdownItemProps[] = [
    { key: 'cashier', text: 'Thu ngân', value: 'cashier' },
    { key: 'stockClerk', text: 'Kiểm hàng', value: 'stockClerk' },
    { key: 'manager', text: 'Quản lí', value: 'manager' }
]

const possitionOptions: DropdownItemProps[] = [
    { key: '1', text: 'Thu ngân', value: 'Thu ngân' },
    { key: '2', text: 'Kiểm hàng', value: 'Kiểm hàng' },
    { key: '3', text: 'Quản lí', value: 'Quản lí' }
]

class UserDetail extends React.Component<IEmployeeDetailProps, IEmployeeDetailState> {
    constructor(props: IEmployeeDetailProps) {
        super(props);

        this.state = {
            employee: {
                _id: this.props.employee && this.props.employee._id
            }
        };

        this.props.employee && this.state.employee == { ...props.employee };
        this.props.onChange && this.props.onChange(this.state.employee);
    }

    handleOnAnyValueChange = (valueType: ValueType, value: any): void => {
        let replacement: Partial<IEmployee> = {};
        (replacement as any)[valueType] = value;
        this.setState({
            employee: Object.assign<Partial<IEmployee>, Partial<IEmployee>, Partial<IEmployee>>({}, this.state.employee, replacement)
        }, () => {
            this.props.onChange(this.state.employee);
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Tên nhân viên</label>
                        <Input
                            placeholder='Nhập họ và tên ...'
                            defaultValue={this.props.employee && this.props.employee.fullName}
                            onChange={(event, data) => this.handleOnAnyValueChange('fullName', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Công việc</label>
                        <Dropdown
                            fluid
                            selection
                            options={possitionOptions}
                            clearable
                            defaultValue={this.props.employee && this.props.employee.position}
                            placeholder='Chọn công việc của nhân viên ...'
                            onChange={(event, data) => this.handleOnAnyValueChange('position', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Mức lương</label>
                        <Input
                            placeholder='Nhập mức lương ...'
                            defaultValue={this.props.employee && this.props.employee.salary || 0}
                            onChange={(event, data) => this.handleOnAnyValueChange('salary', data.value)}
                            type='number'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Số điện thoại</label>
                        <Input
                            placeholder='Nhập số điện thoại ...'
                            defaultValue={this.props.employee && this.props.employee.phoneNumber}
                            onChange={(event, data) => this.handleOnAnyValueChange('phoneNumber', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Số CMND</label>
                        <Input
                            placeholder='Nhập số CMND ...'
                            defaultValue={this.props.employee && this.props.employee.idNumber}
                            onChange={(event, data) => this.handleOnAnyValueChange('idNumber', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Địa chỉ</label>
                        <Input
                            placeholder='Nhập địa chỉ ...'
                            defaultValue={this.props.employee && this.props.employee.address}
                            onChange={(event, data) => this.handleOnAnyValueChange('address', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Tên tài khoản (dùng để đăng nhập vào hệ thống)</label>
                        <Input
                            placeholder='Nhập tên tài khoản ...'
                            defaultValue={this.props.employee && this.props.employee.userName}
                            onChange={(event, data) => this.handleOnAnyValueChange('userName', data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Mật khẩu (dùng để đăng nhập vào hệ thống)</label>
                        <Input
                            placeholder='Nhập mật khẩu ...'
                            defaultValue=''
                            onChange={(event, data) => this.handleOnAnyValueChange('password', data.value)}
                            type='password'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Phân quyền (để sử dụng được những chức năng cụ thể)</label>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={permissionOptions}
                            defaultValue={this.props.employee && this.props.employee.roles}
                            placeholder='Chọn quyền cho nhân viên ...'
                            noResultsMessage=''
                            onChange={(event, data) => this.handleOnAnyValueChange('roles', data.value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default UserDetail;
