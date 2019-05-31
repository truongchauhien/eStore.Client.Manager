import * as React from 'react';
import { Button, Icon, Table, Pagination, PaginationProps } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { AppState } from '../../rootReducer';
import { ProductState } from './product-reducer';
import * as styles from './styles.scss';
import ProductDetail from './product-detail/product-detail';
import {
    productListAction,
    productCreateAction,
    productUpdateAction,
    productDeleteAction
} from './product-actions';
import { bindActionCreators } from 'redux';
import DetailModal from '../commons/detail-modal/detail-modal';
import { IProduct } from '../../commons/types/models/product';
import { convertNumberToCurrency } from '../../commons/utils/numberFormat';

interface IProductManagementProps {
    products: ProductState
    productListAction: typeof productListAction,
    productCreateAction: typeof productCreateAction,
    productUpdateAction: typeof productUpdateAction,
    productDeleteAction: typeof productDeleteAction
}

interface IProuductManagementState {
    products: {
        total: number,
        data: IProduct[]
    },
    isAddProductModalOpen: boolean,
    isEditProductModalOpen: boolean,
    newProductData: Partial<IProduct>,
    editingProductData: Partial<IProduct>,
    selectedProductId: string
}

const PRODUCT_PER_PAGE = 10

class ProductManagement extends React.Component<IProductManagementProps, IProuductManagementState> {
    constructor(props: IProductManagementProps) {
        super(props);

        this.state = {
            products: {
                total: 0,
                data: []
            },
            isAddProductModalOpen: false,
            isEditProductModalOpen: false,
            newProductData: {},
            editingProductData: {},
            selectedProductId: ''
        }

        this.props.productListAction({
            limit: PRODUCT_PER_PAGE,
            offset: 0
        });
    }

    private handlePaginationPageChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) => {
        this.props.productListAction({
            limit: PRODUCT_PER_PAGE,
            offset: (data.activePage as number - 1) * PRODUCT_PER_PAGE
        })
    }

    private handleAddProductClick = () => {
        this.setState({
            isAddProductModalOpen: true
        });
    }

    private handleAddProductModalClose = () => {
        this.setState({
            isAddProductModalOpen: false
        });
    }

    private handleAddProductModalNoClick = () => {
        this.setState({
            isAddProductModalOpen: false
        });
    }

    private handleAddProductModalYesClick = () => {
        this.setState({
            isAddProductModalOpen: false
        });
        this.props.productCreateAction(this.state.newProductData);
    }

    private handleNewProductChange = (product: Partial<IProduct>) => {
        this.setState({
            newProductData: product
        });
    }

    private handleEditProductClick = (id: string) => {
        this.setState({
            selectedProductId: id,
            isEditProductModalOpen: true
        });
    }

    private handleDeleteProductClick = (id: string) => {
        this.props.productDeleteAction({
            _id: id
        });
    }

    private handleEditProductModalClose = () => {
        this.setState({
            isEditProductModalOpen: false
        });
    }

    private handleEditProductModalNoClick = () => {
        this.setState({
            isEditProductModalOpen: false
        });
    }

    private handleEditProductModalYesClick = () => {
        this.setState({
            isEditProductModalOpen: false
        });
        this.props.productUpdateAction(this.state.editingProductData);
    }

    private handleEditProductChange = (product: Partial<IProduct>): void => {
        this.setState({
            editingProductData: product
        });
    }

    render() {
        const { products } = this.props;
        const { isAddProductModalOpen, isEditProductModalOpen } = this.state;

        const totalPage = Math.ceil((products.total / PRODUCT_PER_PAGE) || 1); // Do not show 0 page!

        return (
            <div>
                <div>
                    <Button primary content='Thêm sản phẩm' onClick={this.handleAddProductClick} />
                    <DetailModal
                        open={isAddProductModalOpen}
                        title={'Thêm sản phẩm'}
                        onClose={this.handleAddProductModalClose}
                        onNoClick={this.handleAddProductModalNoClick}
                        onYesClick={this.handleAddProductModalYesClick}
                        icon='add'
                    >
                        <ProductDetail onChange={this.handleNewProductChange} />
                    </DetailModal>
                </div>

                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
                                <Table.HeaderCell>Giá</Table.HeaderCell>
                                <Table.HeaderCell>Đơn vị</Table.HeaderCell>
                                <Table.HeaderCell>Số lượng</Table.HeaderCell>
                                <Table.HeaderCell width='3'><Icon name='settings' /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.products.data.map((product, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{product.name}</Table.Cell>
                                        <Table.Cell>{convertNumberToCurrency(product.price)}</Table.Cell>
                                        <Table.Cell>{product.unit}</Table.Cell>
                                        <Table.Cell>{product.quantity}</Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <Button negative onClick={() => { this.handleDeleteProductClick(product._id) }}>Xóa</Button>
                                                <Button.Or text='-' />
                                                <Button onClick={() => { this.handleEditProductClick(product._id) }}>Chỉnh sửa</Button>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                    <Pagination defaultActivePage={1} totalPages={totalPage} floated='right' onPageChange={this.handlePaginationPageChange} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                        <DetailModal
                            open={isEditProductModalOpen}
                            title={'Chỉnh sửa sản phẩm'}
                            onClose={this.handleEditProductModalClose}
                            onNoClick={this.handleEditProductModalNoClick}
                            onYesClick={this.handleEditProductModalYesClick}
                            icon='edit'
                        >
                            <ProductDetail
                                onChange={this.handleEditProductChange}
                                product={this.props.products.data.find(product => product._id === this.state.selectedProductId)}
                            />
                        </DetailModal>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    products: state.products
});

const mapDispatchToProps = (dispatch: any) => ({
    productListAction: bindActionCreators(productListAction, dispatch),
    productCreateAction: bindActionCreators(productCreateAction, dispatch),
    productUpdateAction: bindActionCreators(productUpdateAction, dispatch),
    productDeleteAction: bindActionCreators(productDeleteAction, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement);
