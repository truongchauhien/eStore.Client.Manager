import * as React from 'react';
import { connect } from 'react-redux';
import { Label, Input, Header, Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';
import * as styles from './styles.scss';
import { AppState } from '../../../../rootReducer';
import { ICategoryState } from '../../category/category-reducer';
import { IDistributorState } from '../../distributor/distributor-reducer';
import { bindActionCreators } from 'redux';
import { categoryListAction } from '../../category/category-actions';
import { distributorListAction } from '../../distributor/distributor-actions';
import { IProduct } from '../product-reducer';

const unitOptions: { key: string, text: string, value: string }[] = [
    { key: 'kg', text: 'kg', value: 'kg' },
    { key: 'hộp', text: 'hộp', value: 'hộp' },
    { key: 'bịch', text: 'bịch', value: 'bịch' },
    { key: 'chai', text: 'chai', value: 'chai' },
];

interface IProductDetailProps {
    product?: Partial<IProduct>,
    onChange: (product: Partial<IProduct>) => void,
    categories: ICategoryState,
    distributors: IDistributorState
    categoryListAction: typeof categoryListAction,
    distributorListAction: typeof distributorListAction
}

interface IProductDetailState {
    product: {
        _id: string,
        name: string,
        upc: string,
        price: number,
        unit: string,
        quantity: number,
        category: string,
        distributor: string
    }
}

enum ValueType {
    name,
    upc,
    price,
    unit,
    quantity,
    category,
    distributor
}

class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {
    constructor(props: IProductDetailProps) {
        super(props);

        this.props.categoryListAction();
        this.props.distributorListAction();

        this.state = {
            product: {
                _id: this.props.product && this.props.product._id,
                name: this.props.product && this.props.product.name,
                upc: this.props.product && this.props.product.upc,
                price: this.props.product && this.props.product.price,
                unit: this.props.product && this.props.product.unit,
                quantity: this.props.product && this.props.product.quantity,
                category: this.props.product && this.props.product.category,
                distributor: this.props.product && this.props.product.distributor
            }
        }

        this.props.onChange && this.props.onChange(this.state.product)
    }

    handleOnAnyValueChange = (valueType: ValueType, value: any) => {
        let replacement: Partial<IProductDetailState['product']> = {};

        switch (valueType) {
            case ValueType.name:
                replacement.name = value;
                break;
            case ValueType.upc:
                replacement.upc = value;
                break;
            case ValueType.unit:
                replacement.unit = value;
                break;
            case ValueType.price:
                replacement.price = value;
                break;
            case ValueType.quantity:
                replacement.quantity = value;
                break;
            case ValueType.category:
                replacement.category = value;
                break;
            case ValueType.distributor:
                replacement.distributor = value;
                break;
            default:
                throw Error('Hello World!');
        }

        this.setState({
            product: Object.assign({}, this.state.product, { ...replacement })
        }, () => {
            this.props.onChange && this.props.onChange(this.state.product);
        });
    }

    render() {
        const categoryOptions = this.props.categories.data.map((category, index) => ({
            key: index,
            text: category.name,
            value: category._id
        }));

        const distributorOptions = this.props.distributors.data.map((distributor, index) => ({
            key: index,
            text: distributor.name,
            value: distributor._id
        }));

        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Tên sản phẩm</label>
                        <Input
                            placeholder='Nhập tên sản phẩm ...'
                            defaultValue={this.props.product && this.props.product.name}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.name, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Mã UPC</label>
                        <Input
                            placeholder='Nhập mã UPC của sản phẩm ...'
                            defaultValue={this.props.product && this.props.product.upc}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.upc, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Giá</label>
                        <Input
                            placeholder='Nhập giá của một đơn vị sản phẩm ...'
                            defaultValue={this.props.product && this.props.product.price}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.price, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Đơn vị</label>
                        <Dropdown
                            deburr
                            fluid
                            search
                            selection
                            options={unitOptions}
                            placeholder='Chọn đơn vị cho sản phẩm ...'
                            noResultsMessage='Không tìm thấy đơn vị,'
                            defaultValue={this.props.product && this.props.product.unit}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.unit, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Số lượng</label>
                        <Input
                            placeholder='Số lượng của sản phẩm ...'
                            defaultValue={this.props.product && this.props.product.quantity || 0}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.quantity, data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Danh mục</label>
                        <Dropdown
                            deburr
                            fluid
                            search
                            selection
                            options={categoryOptions}
                            placeholder='Chọn danh mục cho sản phẩm ...'
                            noResultsMessage='Không tìm thấy danh mục.'
                            defaultValue={this.props.product && this.props.product.category}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.category, data.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Nhà phân phối</label>
                        <Dropdown
                            deburr
                            fluid
                            search
                            selection
                            options={distributorOptions}
                            placeholder='Chọn nhà phân phối cho sản phẩm ...'
                            noResultsMessage='Không tìm thấy nhà cung cấp.'
                            defaultValue={this.props.product && this.props.product.distributor}
                            onChange={(event, data) => this.handleOnAnyValueChange(ValueType.distributor, data.value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    categories: state.categories,
    distributors: state.distributors
});

const mapDispatchToProps = (dispatch: any) => ({
    categoryListAction: bindActionCreators(categoryListAction, dispatch),
    distributorListAction: bindActionCreators(distributorListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
