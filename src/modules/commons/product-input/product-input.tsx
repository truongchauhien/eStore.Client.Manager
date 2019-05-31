import * as React from "react";
import {
    Dropdown, Input, Button, Icon, List,
    DropdownProps,
    InputOnChangeData
} from "semantic-ui-react";
import { convertNumberToCurrency } from "../../../commons/utils/numberFormat";
import { Subject, Subscription } from "rxjs";
import { IProduct } from "../../../commons/types/models/product";
import { debounceTime } from "rxjs/operators";
import { listProductApiRequest, detailProductApiRequest } from "../../../commons/apis/productApi";

interface IProductInputProps {
    onChooseProduct?: (product: Partial<IProduct>) => void,
}

interface IProductInputState {
    inputType: 'upc' | 'name',
    inputValue: string,
    suggestedProducts: Partial<IProduct>[],
    isSuggestionOpen: boolean,
    isFetchingProduct: boolean,
    hasErrorWhenGetProduct: boolean,
}

const INPUT_TYPE_OPTIONS = [
    { key: 'upc', text: 'Mã vạch sản phẩm', value: 'upc' },
    { key: 'name', text: 'Tên sản phẩm', value: 'name' },
]

class ProductInput extends React.Component<IProductInputProps, IProductInputState> {
    private suggestionRef: React.RefObject<HTMLDivElement>

    private searchSubject: Subject<string>
    private searchSubscription: Subscription

    constructor(props: IProductInputProps) {
        super(props);
        this.state = {
            inputType: 'upc',
            inputValue: '',
            suggestedProducts: [],
            isSuggestionOpen: false,
            isFetchingProduct: false,
            hasErrorWhenGetProduct: false
        };
        this.suggestionRef = React.createRef();
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutsideSuggestion)

        this.searchSubject = new Subject<string>();
        this.searchSubscription = this.searchSubject.pipe(
            debounceTime(500),
        ).subscribe(async (searchQuery) => {
            const responsePayload = await listProductApiRequest({ name: searchQuery });
            this.setState({
                suggestedProducts: responsePayload.data
            });
        });
    }

    componentWillUnmount = () => {
        document.addEventListener('mousedown', this.handleClickOutsideSuggestion);

        this.searchSubscription.unsubscribe();
    }

    handleClickOutsideSuggestion = (event: MouseEvent) => {
        if (
            this.suggestionRef.current &&
            !this.suggestionRef.current.contains(event.target as Node)
        ) {
            this.setState({ isSuggestionOpen: false });
        }
    }

    handleInputTypeChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        this.setState({
            inputType: data.value as any
        });
    }

    handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        this.setState({
            inputValue: data.value,
            hasErrorWhenGetProduct: false
        });

        switch (this.state.inputType) {
            case 'name':
                this.searchSubject.next(data.value);
                this.setState({ isSuggestionOpen: true });
                break;
            case 'upc':
            default:
                break;
        }
    }

    getProductDetail = async (upc: string): Promise<void> => {
        try {
            if (!upc) return;
            
            let responsePayload = await detailProductApiRequest({ idType: "upc", upc: upc });
            this.props.onChooseProduct && this.props.onChooseProduct(responsePayload);

            this.setState({
                inputValue: ''
            })
        } catch (ex) {
            console.log(ex);
            this.setState({
                hasErrorWhenGetProduct: true
            });
        } finally {
            this.setState({
                isFetchingProduct: false
            });
        }
    }

    handleAddClick = () => {
        if (this.state.inputType === 'upc') {
            this.getProductDetail(this.state.inputValue);
        }
    }

    handleSuggestedItemClick = (upc: string) => {
        this.setState({ isSuggestionOpen: false });
        this.getProductDetail(upc);
    }

    render() {
        return (
            <div>
                <Dropdown compact selection
                    options={INPUT_TYPE_OPTIONS}
                    defaultValue='upc'
                    onChange={this.handleInputTypeChange}
                />
                <div ref={this.suggestionRef} style={{ display: 'inline', position: 'relative' }}>
                    <Input
                        iconPosition='left' action
                        loading={this.state.isFetchingProduct}
                        error={this.state.hasErrorWhenGetProduct}
                        onChange={this.handleInputValueChange}>
                        {(() => {
                            switch (this.state.inputType) {
                                case 'upc':
                                    return <Icon name='barcode' />;
                                case 'name':
                                    return <Icon name='search' />
                                default:
                                    return <Icon name='bug' />
                            }
                        })()}
                        <input value={this.state.inputValue} />
                        <Button icon color='green' onClick={this.handleAddClick}>
                            <Icon name='add' />
                        </Button>
                    </Input>
                    <List hidden={!this.state.isSuggestionOpen} style={{ position: 'absolute', left: '0px', top: '14px', width: '100%', boxShadow: '3px 3px 5px 6px #ccc', background: '#F9F9FA', zIndex: 1 }} divided relaxed>
                        {this.state.suggestedProducts.map((product, index) => (
                            <List.Item key={index} onClick={() => this.handleSuggestedItemClick(product.upc)}>
                                <List.Icon name='add' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as='a'>{product.name}</List.Header>
                                    <List.Description as='a'>{convertNumberToCurrency(product.price)}</List.Description>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default ProductInput;
