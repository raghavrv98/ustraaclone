import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';

class Routes extends React.Component {

	render() {
		return <React.Fragment>
			<BrowserRouter>
				<Switch>
					<Route exact path="/all-products/:id" render={props => <App {...props} />} />
					<Route exact path="/" render={props => <App {...props} />} />
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	}
}

export default Routes;