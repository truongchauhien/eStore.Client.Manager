import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sidebar, Segment, Menu, Icon, Header, Image, Button, Dropdown, MenuItemProps } from 'semantic-ui-react';
import * as styles from './styles.scss';
import { AppState } from '../../rootReducer';
import { userLogoutRequest } from '../../commons/user/user-actions';
import ProductManagement from '../product/product-management';
import DistributorManagement from '../distributor/distributor-management';
import CategoryManagement from '../category/category-management';
import Order from '../order/order';
import WorkerManagement from '../employee/employee-management';
import WorkShiftManagement from '../work-shift/work-shift-management';
import Supply from '../supply/supply';
import ModalRoot from '../commons/modal/modal-root';
import Report from '../report/report';
import Can from '../../commons/permission/can-component';

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
            selectedBusiness: ''
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
                            <Can requiredResource='order' requiredPermission='create'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('order')}>
                                    <Icon name='shopping cart' />
                                    Tạo hóa đơn
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='product' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('product')}>
                                    <Icon name='cubes' />
                                    Sản phẩm
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='category' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('category')}>
                                    <Icon name='folder' />
                                    Danh mục
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='distributor' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('distributor')}>
                                    <Icon name='industry' />
                                    Nhà phân phối
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='supply' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('supply')}>
                                    <Icon name='truck' />
                                    Nhập hàng
                            </Menu.Item>
                            </Can>
                            <Can requiredResource='report' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('report')}>
                                    <Icon name='chart bar' />
                                    Báo cáo
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='employee' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('employee')}>
                                    <Icon name='user secret' />
                                    Nhân viên
                                </Menu.Item>
                            </Can>
                            <Can requiredResource='workShift' requiredPermission='read'>
                                <Menu.Item as='a' onClick={() => this.handleBusinessClick('workShift')}>
                                    <Icon name='time' />
                                    Phân ca
                                </Menu.Item>
                            </Can>
                        </Sidebar>

                        <Sidebar.Pusher dimmed={sideBarVisible}>
                            {(() => {
                                switch (selectedBusiness) {
                                    case 'order':
                                        return <Order />
                                    case 'product':
                                        return (<ProductManagement />);
                                    case 'distributor':
                                        return <DistributorManagement />;
                                    case 'category':
                                        return <CategoryManagement />;
                                    case 'supply':
                                        return <Supply />;
                                    case 'report':
                                        return <Report />
                                    case 'employee':
                                        return <WorkerManagement />;
                                    case 'workShift':
                                        return <WorkShiftManagement />;
                                    default:
                                        return null;
                                }
                            })()}
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>

                    <ModalRoot />
                </div>
            </div >
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
