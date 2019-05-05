import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { AppState } from '../../rootReducer'

interface ISecuredRouteProps {
    component: any,
    path: string,
    isAuthenticated: boolean,
    [key: string]: any
}

interface ISecuredRouteState {
    isAuthenticated: boolean
}

class SecuredRoute extends React.Component<ISecuredRouteProps, ISecuredRouteState> {
    constructor(props: ISecuredRouteProps) {
        super(props)
    }

    render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={() => {
                if (isAuthenticated) {
                    return <Component />
                } else {
                    return <Redirect to={{ pathname: '/login' }} />
                }
            }} />
        )
    }
}

const mapStateToProps = (state: AppState, ownProps: any) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        ...ownProps
    }
}

export default withRouter(connect(mapStateToProps)(SecuredRoute))
