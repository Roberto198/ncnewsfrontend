import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: lightBlue,
		background: {
			default: '#bbdefb',
		},
		type: 'light',
	},
});
console.log(theme);
ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
);
