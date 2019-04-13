import * as React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon, Header, Image, Button, Dropdown } from 'semantic-ui-react';
// @ts-ignore
import * as styles from './styles.scss'

interface IMainLayoutProps {

}

interface IMainLayoutState {
    sideBarVisible: boolean,
    menuActiveItem: string
}

class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutState> {
    constructor(props: IMainLayoutProps) {
        super(props)
        this.state = {
            sideBarVisible: false,
            menuActiveItem: 'home'
        }
    }

    handleHideSideBarClick = () => this.setState({ sideBarVisible: false })
    handleShowSideBarClick = () => this.setState({ sideBarVisible: true })
    handleSidebarHide = () => this.setState({ sideBarVisible: false });

    handleMenuItemClick = (event: any, { name }: { name: string }) => this.setState({ menuActiveItem: name })

    render() {
        const { sideBarVisible, menuActiveItem } = this.state;

        return (
            <div>
                <Button.Group>
                    <Button disabled={sideBarVisible} onClick={this.handleShowSideBarClick}>Show sidebar</Button>
                    <Button disabled={!sideBarVisible} onClick={this.handleHideSideBarClick}>Hide sidebar</Button>
                </Button.Group>

                <Menu size='large'>
                    <Menu.Item name='home' active={menuActiveItem === 'home'} onClick={this.handleMenuItemClick} />
                    <Menu.Item name='messages' active={menuActiveItem === 'messages'} onClick={this.handleMenuItemClick} />

                    <Menu.Menu position='right'>
                        <Dropdown item text='Language'>
                            <Dropdown.Menu>
                                <Dropdown.Item>English</Dropdown.Item>
                                <Dropdown.Item>Russian</Dropdown.Item>
                                <Dropdown.Item>Spanish</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item>
                            <Button primary>Đăng nhập</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Sidebar.Pushable as={Segment}>
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
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={true}>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default connect()(MainLayout);
