import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sidebar, Segment, Menu, Icon, Header, Image, Button, Dropdown, MenuItemProps } from 'semantic-ui-react';
import * as styles from './styles.scss';
import { AppState } from '../../rootReducer';
import { userLogoutRequest } from '../../commons/user/user-actions';
import ProductManagement from '../manager/product/product-management';
import DistributorManagement from '../manager/distributor/distributor-management';
import CategoryManagement from '../manager/category/category-management';

interface IMainLayoutProps {
    userName: string,
    userLogoutRequest: typeof userLogoutRequest
}

interface IMainLayoutState {
    sideBarVisible: boolean,
    menuActiveItem: string,
    selectedBusiness: string
}

class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutState> {
    constructor(props: IMainLayoutProps) {
        super(props)
        this.state = {
            sideBarVisible: false,
            menuActiveItem: 'home',
            selectedBusiness: 'category'
        }
    }

    sideBarTriggerClick = () => {
        this.setState({ sideBarVisible: true })
    }

    handleSidebarHide = () => this.setState({ sideBarVisible: false });

    handleMenuItemClick = (event: any, { name }: { name: string }) => this.setState({ menuActiveItem: name })

    handleUserLogoutClick = () => {
        this.props.userLogoutRequest();
    }

    handleBusinessClick = (bussinessName: string) => {
        this.setState({
            selectedBusiness: bussinessName,
            sideBarVisible: false
        });
    }

    render() {
        const { sideBarVisible, menuActiveItem, selectedBusiness } = this.state;
        const { userName } = this.props;

        return (
            <div>
                <div className={styles.mainFlex}>
                    <Menu size='large' className={styles.menuBar}>
                        <Menu.Item name='sideBarTrigger'
                            active={menuActiveItem === 'sideBarTrigger'}
                            onClick={(event, data) => { this.sideBarTriggerClick(); this.handleMenuItemClick(event, data as { name: string }) }}
                        >
                            <Icon name='grid layout' />
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown item text={userName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.handleUserLogoutClick}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>

                    <Sidebar.Pushable as={Segment} className={styles.sideBar}>
                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            onHide={this.handleSidebarHide}
                            vertical
                            visible={sideBarVisible}
                            width='thin'
                        >
                            <Menu.Item as='a' onClick={() => this.handleBusinessClick('')}>
                                <Icon name='shopping cart' />
                                Tạo hóa đơn
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='user secret' />
                                Nhân viên
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => this.handleBusinessClick('product')}>
                                <Icon name='cubes' />
                                Sản phẩm
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => this.handleBusinessClick('category')}>
                                <Icon name='folder' />
                                Danh mục
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => this.handleBusinessClick('distributor')}>
                                <Icon name='industry' />
                                Nhà phân phối
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='truck' />
                                Nhập hàng
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => this.handleBusinessClick('report')}>
                                <Icon name='chart bar' />
                                Báo cáo
                            </Menu.Item>
                        </Sidebar>

                        <Sidebar.Pusher dimmed={sideBarVisible}>
                            {(() => {
                                switch (selectedBusiness) {
                                    case 'product':
                                        return <ProductManagement />;
                                    case 'distributor':
                                        return <DistributorManagement />;
                                    case 'category':
                                        return <CategoryManagement />;

                                    default:
                                        return null;
                                }
                            })()}
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    userName: state.user.userName
});

const mapDispatchToProps = (dispatch: any) => ({
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
