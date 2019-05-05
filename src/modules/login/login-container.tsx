import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Button, InputOnChangeData, ButtonProps, Message, Icon } from 'semantic-ui-react';
import * as styles from './styles.scss';
import { userLoginRequest } from '../../commons/user/user-actions';
import { bindActionCreators } from 'redux';
import { AppState } from '../../rootReducer';
import { Redirect } from 'react-router';

interface ILoginProps {
    userLoginRequest: typeof userLoginRequest,
    isAuthenticated: boolean,
    errorCode: number
}

interface ILoginState {
    userName: string,
    password: string
}

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        this.setState({
            userName: data.value,
        })
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        this.setState({
            password: data.value,
        })
    }

    handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps): void => {
        const { userName, password } = this.state;
        this.props.userLoginRequest({ userName: userName, password: password })
    }

    componentWillUnmount() {

    }

    message(errorCode: number) {
        switch (errorCode) {
            case -1:
                return 'Không khởi tạo được kết nối mạng.';
            case 400:
                return 'Tên tài khoản hoặc mật khẩu không hợp lệ.';
            case 401:
                return 'Mật khẩu không chính xác.';
            case 404:
                return 'Tài khoản không tồn tại.';
            case 500:
                return 'Hệ thống đang gặp sự cố, xin vui lòng thử lại sau.';
            default:
                return '';
        }
    }

    render() {
        const { isAuthenticated, errorCode } = this.props;
        return (
            isAuthenticated ?
                (<Redirect to='/' />)
                :
                <div className={styles.loginFormContainer}>
                    <div>
                        <Form className={styles.loginForm}>
                            <Form.Input label='Tài khoản:' type='text' onChange={this.handleUserNameChange} />
                            <Form.Input label='Mật khẩu:' type='password' onChange={this.handlePasswordChange} />

                            <Button onClick={this.handleSubmitClick}>Đăng nhập</Button>
                        </Form>
                        <br />
                        {Boolean(errorCode) &&
                            <Message className={styles.loginFormContainer.errorMessage} attached='bottom' icon warning>
                                <Icon name='bug' />
                                <Message.Content>
                                    <Message.Header>Oops!</Message.Header>
                                    {this.message(errorCode)}
                                </Message.Content>
                            </Message>
                        }
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.user.isAuthenticated,
    errorCode: state.user.errorCode
})

const mapDispatchToProps = (dispatch: any) => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
