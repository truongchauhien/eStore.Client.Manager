import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer, { AppState } from './rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './rootEpic';
import Login from './modules/login/login-container'
import MainLayout from './modules/main-layout/main-layout-container';
import SecuredRoute from './commons/permission/secured-route';

// ===============================================
// App Container Component
interface IAppProps {
    isAuthenticated: boolean
}

class App extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props)
    }

    render() {
        const { isAuthenticated } = this.props
        return (
            <BrowserRouter>
                {/** Used to redirect to login page or portal page when open app at root level. */}
                <Route exact path='/' render={() => (
                    isAuthenticated ?
                        <Redirect to='/portal' />
                        :
                        <Redirect to='/login' />
                )} />

                <Route path='/login' component={Login} />
                <SecuredRoute path='/portal' component={MainLayout} />
            </BrowserRouter >
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.user.isAuthenticated
})

const AppContainer = connect(mapStateToProps)(App)
// ===============================================

// ===============================================
// Setup Redux Store and middlewares.

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(epicMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>
    ,
    document.getElementById('root')
);
// ===============================================

// ===============================================
// Webpack hot reload
if (module.hot) {
    module.hot.accept();
}
// ===============================================
