import * as React from 'react';
import { Table, Checkbox, Button, Icon } from 'semantic-ui-react';
import ProductInput from '../../commons/product-input/product-input';
import { IProduct } from '../../../commons/types/models/product';
import { ISupply } from '../../../commons/types/models/supply';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModalAction } from '../../commons/modal/modal-actions';
import { ModalTypes, CONFIRM_MODAL } from '../../commons/modal/types';
import { createSupplyApiRequest } from '../../../commons/apis/supplyApi';
import { AppState } from '../../../rootReducer';

interface ISupplyRequestProps {
    showModalAction: (payload: ModalTypes) => void
}

interface ISupplyRequestState {
    requests: {
        total: number,
        data: ISupply[]
    }
}

class SupplyRequest extends React.Component<ISupplyRequestProps, ISupplyRequestState> {
    constructor(props: ISupplyRequestProps) {
        super(props);

        this.state = {
            requests: {
                total: 0,
                data: []
            }
        };
    }

    componentDidMount = async () => {

    }

    handleOnChooseProduct = (product: Partial<IProduct>) => {
        const createSupplyRequest = async () => {
            try {
                const responsePayload = await createSupplyApiRequest({ product: product._id, requestedBy: localStorage.getItem('userId') })
            } catch (ex) {

            }
        }

        this.props.showModalAction({
            modalType: CONFIRM_MODAL,
            modalProps: {
                header: 'Xác nhận',
                content: 'Bạn có chắc chắn muốn thêm sản phẩm vào danh sách hàng cần nhập?',
                onConfirm: createSupplyRequest
            }
        });
    }

    render() {
        return (
            <div>
                <ProductInput onChooseProduct={this.handleOnChooseProduct} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    showModalAction: bindActionCreators(showModalAction, dispatch)
});

export default connect(null, mapDispatchToProps)(SupplyRequest);
