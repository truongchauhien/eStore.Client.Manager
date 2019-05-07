import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Header, Button, Table, Pagination, Icon } from 'semantic-ui-react';
import { AppState } from '../../../rootReducer';
import CategoryDetail from './category-detail/category-detail';
import DetailModal from '../commons/detail-modal';
import { categoryCreateAction, categoryListAction, categoryUpdateAction, categoryDeleteAction } from './category-actions';
import { ICategoryState, ICategory } from './category-reducer';

interface ICategoryManagementProps {
    categoryCreateAction: typeof categoryCreateAction,
    categoryListAction: typeof categoryListAction,
    categoryUpdateAction: typeof categoryUpdateAction,
    categoryDeleteAction: typeof categoryDeleteAction,
    categories: ICategoryState
}

interface ICategoryManagementState {
    isAddCategoryModalOpen: boolean,
    isEditCategoryModalOpen: boolean,
    newCategoryData: Partial<ICategory>,
    editingCategoryData: Partial<ICategory>,
    selectedCategoryId: string
}

class CategoryManagement extends React.Component<ICategoryManagementProps, ICategoryManagementState> {
    constructor(props: ICategoryManagementProps) {
        super(props);

        this.state = {
            isAddCategoryModalOpen: false,
            isEditCategoryModalOpen: false,
            newCategoryData: {
                name: ''
            },
            editingCategoryData: {
                name: ''
            },
            selectedCategoryId: ''
        }

        this.props.categoryListAction({});
    }

    handleAddCategoryClick = () => {
        this.setState({ isAddCategoryModalOpen: true });
    }

    handleAddCategoryModalClose = () => {
        this.setState({ isAddCategoryModalOpen: false });
    }

    handleAddCategoryModalNoClick = () => {
        this.setState({ isAddCategoryModalOpen: false });
    }

    handleAddCategoryModalYesClick = () => {
        this.props.categoryCreateAction(this.state.newCategoryData);
        this.setState({ isAddCategoryModalOpen: false });
    }

    handleNewCategoryChange = (category: Partial<ICategory>) => {
        this.setState({ newCategoryData: category });
    }

    handleEditCategoryClick = (id: string) => {
        this.setState({
            isEditCategoryModalOpen: true,
            selectedCategoryId: id
        });
    }

    handleEditCategoryModalClose = () => {
        this.setState({ isEditCategoryModalOpen: false });
    }

    handleEditCategoryModalNoClick = () => {
        this.setState({ isEditCategoryModalOpen: false });
    }

    handleEditCategoryModalYesClick = () => {
        this.props.categoryUpdateAction(
            Object.assign(
                {},
                this.state.editingCategoryData,
                { _id: this.state.selectedCategoryId })
        );
        this.setState({ isEditCategoryModalOpen: false });
    }

    handleEditCategoryModalChange = (category: Partial<ICategory>) => {
        this.setState({ editingCategoryData: category });
    }

    handleDeleteCategoryClick = (id: string) => {
        this.props.categoryDeleteAction({ _id: id });
    }

    render() {
        const { categories } = this.props;
        const { isAddCategoryModalOpen, isEditCategoryModalOpen } = this.state;
        return (
            <div>
                <div>
                    <Button content='Thêm danh mục' onClick={this.handleAddCategoryClick} />
                    <DetailModal
                        open={isAddCategoryModalOpen}
                        title={'Thêm danh mục'}
                        onClose={this.handleAddCategoryModalClose}
                        onNoClick={this.handleAddCategoryModalNoClick}
                        onYesClick={this.handleAddCategoryModalYesClick}
                        icon='add'
                    >
                        <CategoryDetail onChange={this.handleNewCategoryChange} />
                    </DetailModal>
                </div>

                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Tên danh mục</Table.HeaderCell>
                                <Table.HeaderCell width='3'><Icon name='settings' /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {categories.data.map((category) => {
                                return (
                                    <Table.Row key={category._id}>
                                        <Table.Cell>{category.name}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                basic
                                                onClick={() => { this.handleEditCategoryClick(category._id) }}
                                            >
                                                <Icon name='edit' fitted />
                                            </Button>
                                            <Button
                                                basic
                                                onClick={() => { this.handleDeleteCategoryClick(category._id) }}
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
                        open={isEditCategoryModalOpen}
                        title={'Chỉnh sửa danh mục'}
                        onClose={this.handleEditCategoryModalClose}
                        onNoClick={this.handleEditCategoryModalNoClick}
                        onYesClick={this.handleEditCategoryModalYesClick}
                        icon='edit'
                    >
                        <CategoryDetail onChange={this.handleEditCategoryModalChange} category={categories.data.find(category => category._id === this.state.selectedCategoryId)} />
                    </DetailModal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch: any) => ({
    categoryCreateAction: bindActionCreators(categoryCreateAction, dispatch),
    categoryListAction: bindActionCreators(categoryListAction, dispatch),
    categoryUpdateAction: bindActionCreators(categoryUpdateAction, dispatch),
    categoryDeleteAction: bindActionCreators(categoryDeleteAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement);
