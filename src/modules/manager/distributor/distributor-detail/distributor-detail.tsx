import * as React from 'react';
import * as _ from 'lodash'

import { Form, Dropdown, Input } from 'semantic-ui-react';
import { IDistributor } from '../distributor-reducer';

interface IDistributorDetaillProps {
    distributor?: Partial<IDistributor>,
    onChange?: (category: Partial<IDistributor>) => void
}

interface IDistributorDetailState extends Partial<IDistributor> {

}

enum ValueType {
    name,
    phoneNumber,
    address
}

class DistributorDetail extends React.Component<IDistributorDetaillProps, IDistributorDetailState> {
    constructor(props: IDistributorDetaillProps) {
        super(props);

        this.state = {
            name: props.distributor && props.distributor.name,
            phoneNumber: props.distributor && props.distributor.phoneNumber,
            address: props.distributor && props.distributor.address,
        }
        
        this.props.onChange && this.props.onChange(this.state);
    }

    handleCategoryValueChange = (valueType: ValueType, value: string): void => {
        let replacement: Partial<IDistributor> = {};

        switch (valueType) {
            case ValueType.name:
                replacement.name = value;
                break;
            case ValueType.phoneNumber:
                replacement.phoneNumber = value;
                break;
            case ValueType.address:
                replacement.address = value;
                break;
            default:
                throw Error('Hello World!');
        }

        this.setState(Object.assign({}, this.state, {
            ...replacement
        }), () => {
            this.props.onChange && this.props.onChange({ ...this.state });
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Tên nhà phân phối</label>
                        <Input
                            placeholder='Nhập tên nhà phân phối ...'
                            defaultValue={this.props.distributor && this.props.distributor.name}
                            onChange={(event, data) => this.handleCategoryValueChange(ValueType.name, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Số điện thoại</label>
                        <Input
                            placeholder='Nhập số điện thoại ...'
                            defaultValue={this.props.distributor && this.props.distributor.phoneNumber}
                            onChange={(event, data) => this.handleCategoryValueChange(ValueType.phoneNumber, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Địa chỉ</label>
                        <Input
                            placeholder='Nhập địa chỉ ...'
                            defaultValue={this.props.distributor && this.props.distributor.address}
                            onChange={(event, data) => this.handleCategoryValueChange(ValueType.address, data.value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default DistributorDetail;
