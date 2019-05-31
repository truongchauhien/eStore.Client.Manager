import * as React from 'react';
import { Table, Checkbox, Button, Icon, Tab } from 'semantic-ui-react';
import ProductInput from '../commons/product-input/product-input';
import SupplyRequest from './supply-request/supply-request';
import SupplyApproval from './supply-approval/supply-approval';
import SupplyCheck from './supply-check/supply-check';

interface ISupplyProps {

}

interface ISupplyState {

}

const panes = [
    {
        menuItem: 'Tạo yêu cầu nhập hàng',
        render: () => (
            <Tab.Pane attached={false}>
                <SupplyRequest />
            </Tab.Pane>
        )
    },
    {
        menuItem: 'Duyệt yêu cầu nhập hàng',
        render: () => (
            <Tab.Pane attached={false}>
                <SupplyApproval />
            </Tab.Pane>
        )
    },
    {
        menuItem: 'Kiểm tra hàng được nhập',
        render: () => (
            <Tab.Pane attached={false}>
                <SupplyCheck />
            </Tab.Pane>
        )
    },
]

class RequestedMerchandise extends React.Component<ISupplyProps, ISupplyState> {
    constructor(props: ISupplyProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}

export default RequestedMerchandise;
