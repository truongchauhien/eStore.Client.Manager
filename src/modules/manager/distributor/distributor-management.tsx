import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../rootReducer';
import { Button, Table, Icon } from 'semantic-ui-react';
import DetailModal from '../commons/detail-modal';
import { IDistributor, IDistributorState } from './distributor-reducer';
import DistributorDetail from './distributor-details/distributor-details';
import { bindActionCreators } from 'redux';
import { distributorCreateAction, distributorListAction, distributorUpdateAction, distributorDeleteAction } from './distributor-actions';

interface IDistributorManagementProps {
    distributors: IDistributorState
    distributorCreateAction: typeof distributorCreateAction
    distributorListAction: typeof distributorListAction,
    distributorUpdateAction: typeof distributorUpdateAction,
    distributorDeleteAction: typeof distributorDeleteAction
}

interface IDistributorManagementState {
    isAddDistributorModalOpen: boolean,
    isEditDistributorModalOpen: boolean,
    newDistributorData: Partial<IDistributor>,
    editingDistributorData: Partial<IDistributor>,
    selectedDistributorId: string
}

class DistributorManagement extends React.Component<IDistributorManagementProps, IDistributorManagementState> {
    constructor(props: IDistributorManagementProps) {
        super(props);

        this.state = {
            isAddDistributorModalOpen: false,
            isEditDistributorModalOpen: false,
            newDistributorData: {

            },
            editingDistributorData: {

            },
            selectedDistributorId: ''
        }

        this.props.distributorListAction();
    }

    handleAddDistributorClick = () => {
        this.setState({
            isAddDistributorModalOpen: true
        });
    }

    handleAddDistributorModalClose = () => {
        this.setState({
            isAddDistributorModalOpen: false
        });
    }

    handleAddDistributorModalNoClick = () => {
        this.setState({
            isAddDistributorModalOpen: false
        });
    }

    handleAddDistributorModalYesClick = () => {
        this.setState({
            isAddDistributorModalOpen: false
        });
        this.props.distributorCreateAction(this.state.newDistributorData);
    }

    handleNewDistributorChange = (distributor: Partial<IDistributor>) => {
        this.setState({
            newDistributorData: distributor
        });
    }

    handleEditDistributorClick = (id: string) => {
        this.setState({
            isEditDistributorModalOpen: true,
            selectedDistributorId: id
        });
    }

    handleEditDistributorModalClose = () => {
        this.setState({
            isEditDistributorModalOpen: false
        });
    }

    handleEditDistributorModalNoClick = () => {
        this.setState({
            isEditDistributorModalOpen: false
        });
    }

    handleEditDistributorModalYesClick = () => {
        this.setState({
            isEditDistributorModalOpen: false
        });

        this.props.distributorUpdateAction(
            Object.assign(
                {},
                this.state.editingDistributorData,
                { _id: this.state.selectedDistributorId }
            ));
    }

    handleEditDistributorModalChange = (distributor: Partial<IDistributor>) => {
        this.setState({
            editingDistributorData: distributor
        });
    }

    handleDeleteDistributorClick = (id: string) => {
        this.props.distributorDeleteAction({
            _id: id
        });
    }

    render() {
        const { distributors } = this.props;
        const { isAddDistributorModalOpen, isEditDistributorModalOpen } = this.state;
        return (
            <div>
                <div>
                    <Button content='Thêm nhà phân phối' onClick={this.handleAddDistributorClick} />
                    <DetailModal
                        open={isAddDistributorModalOpen}
                        title={'Thêm nhà phân phối'}
                        onClose={this.handleAddDistributorModalClose}
                        onNoClick={this.handleAddDistributorModalNoClick}
                        onYesClick={this.handleAddDistributorModalYesClick}
                        icon='add'
                    >
                        <DistributorDetail onChange={this.handleNewDistributorChange} />
                    </DetailModal>
                </div>

                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Tên danh mục</Table.HeaderCell>
                                <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                                <Table.HeaderCell>Địa chỉ</Table.HeaderCell>
                                <Table.HeaderCell width='3'>
                                    <Icon name='settings' />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {distributors.data.map((distributor) => {
                                return (
                                    <Table.Row key={distributor._id}>
                                        <Table.Cell>{distributor.name}</Table.Cell>
                                        <Table.Cell>{distributor.phoneNumber}</Table.Cell>
                                        <Table.Cell>{distributor.address}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                basic
                                                onClick={() => { this.handleEditDistributorClick(distributor._id) }}
                                            >
                                                <Icon name='edit' fitted />
                                            </Button>
                                            <Button
                                                basic
                                                onClick={() => { this.handleDeleteDistributorClick(distributor._id) }}
                                            >
                                                <Icon name='delete' fitted color='red' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>

                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    <DetailModal
                        open={isEditDistributorModalOpen}
                        title={'Chỉnh sửa danh mục'}
                        onClose={this.handleEditDistributorModalClose}
                        onNoClick={this.handleEditDistributorModalNoClick}
                        onYesClick={this.handleEditDistributorModalYesClick}
                        icon='edit'
                    >
                        <DistributorDetail onChange={this.handleEditDistributorModalChange} distributor={distributors.data.find(distributor => distributor._id === this.state.selectedDistributorId)} />
                    </DetailModal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    distributors: state.distributors
});

const mapDispatchToProps = (dispatch: any) => ({
    distributorCreateAction: bindActionCreators(distributorCreateAction, dispatch),
    distributorListAction: bindActionCreators(distributorListAction, dispatch),
    distributorUpdateAction: bindActionCreators(distributorUpdateAction, dispatch),
    distributorDeleteAction: bindActionCreators(distributorDeleteAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributorManagement);
