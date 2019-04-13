import * as React from 'react';
import { connect } from 'react-redux';
import MainLayout from './modules/main/main-layout';

class App extends React.Component {
    render() {
        return (
            <MainLayout />
        )
    }
}

export default connect()(App);
