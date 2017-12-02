import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';

import Header from './layout/Header';
import Main from './layout/Main';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    status: {
        danger: 'orange',
    },
});

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Header />
                    <Main />
                </div>
            </MuiThemeProvider>
        );
    }
}